param(
    [switch]$Yes,
    [switch]$NonInteractive,
    [switch]$Launch,
    [switch]$SkipCredentials,
    [switch]$InstallService,
    [switch]$NoService,
    [string]$Exchange = $env:TRADEARK_EXCHANGE,
    [string]$Profile = $env:TRADEARK_PROFILE,
    [string]$InstallDir,
    [int]$Port = $(if ($env:TRADEARK_PORT) { [int]$env:TRADEARK_PORT } else { 38182 })
)

$ErrorActionPreference = "Stop"

$downloadDir = Join-Path $env:TEMP "TradeArkPortable"
$archivePath = Join-Path $downloadDir "tradeark_windows_portable.zip"
$extractPath = Join-Path $downloadDir "extract"
$releaseManifestUrl = if ([string]::IsNullOrWhiteSpace($env:SIGNAL_HORSE_MANIFEST_URL)) {
    "https://tradeark.ai/api/releases/latest"
} else {
    $env:SIGNAL_HORSE_MANIFEST_URL
}
$legacyDownloadUrl = if ([string]::IsNullOrWhiteSpace($env:SIGNAL_HORSE_WINDOWS_DOWNLOAD_URL)) {
    "https://tradeark.ai/releases/latest/tradeark-windows-portable.zip"
} else {
    $env:SIGNAL_HORSE_WINDOWS_DOWNLOAD_URL
}
$resolvedInstallDir = if ([string]::IsNullOrWhiteSpace($InstallDir)) {
    Join-Path $env:LOCALAPPDATA "TradeArk"
} else {
    [System.IO.Path]::GetFullPath($InstallDir)
}
$launcherPath = Join-Path $resolvedInstallDir "Start TradeArk.cmd"
$script:ReleaseManifest = $null

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         TradeArk - Local Mode Installer                ║" -ForegroundColor Cyan
Write-Host "║      Portable Windows package bootstrap helper            ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

function Confirm-Installation {
    if ($Yes -or $NonInteractive) {
        return
    }

    $confirm = Read-Host "Proceed with installation? [Y/n]"
    if ($confirm -match "^[Nn]") {
        Write-Host "Installation cancelled."
        exit 0
    }
}

function Show-CompatibilityWarning {
    $usesDeprecatedOptions =
        $SkipCredentials -or
        $InstallService -or
        $NoService -or
        (-not [string]::IsNullOrWhiteSpace($Exchange)) -or
        (-not [string]::IsNullOrWhiteSpace($Profile)) -or
        $PSBoundParameters.ContainsKey("Port")

    if ($usesDeprecatedOptions) {
        Write-Host "This helper now downloads the portable ZIP only. Credential, service, exchange/profile, and custom port options are no longer applied here." -ForegroundColor Yellow
    }

    if ($NonInteractive) {
        Write-Host "NonInteractive skips prompts and extracts the portable package directly into the target folder." -ForegroundColor Yellow
    }
}

function Get-ReleaseManifest {
    if ($null -ne $script:ReleaseManifest) {
        return $script:ReleaseManifest
    }

    try {
        $script:ReleaseManifest = Invoke-RestMethod -Uri $releaseManifestUrl -Method Get
    }
    catch {
        Write-Host "Release manifest fetch failed from $releaseManifestUrl. Falling back to legacy Windows ZIP URL." -ForegroundColor Yellow
        $script:ReleaseManifest = $false
    }

    return $script:ReleaseManifest
}

function Resolve-ArchiveDownloadUrl {
    $manifest = Get-ReleaseManifest

    if ($manifest -and $manifest.installerUrl) {
        return [string]$manifest.installerUrl
    }

    if ($manifest -and $manifest.platforms -and $manifest.platforms.windows -and $manifest.platforms.windows.installerUrl) {
        return [string]$manifest.platforms.windows.installerUrl
    }

    return $legacyDownloadUrl
}

function Download-Archive {
    if (-not (Test-Path $downloadDir)) {
        New-Item -ItemType Directory -Path $downloadDir -Force | Out-Null
    }

    if (Test-Path $archivePath) {
        Remove-Item $archivePath -Force
    }
    if (Test-Path $extractPath) {
        Remove-Item -Recurse -Force $extractPath
    }

    $downloadUrl = Resolve-ArchiveDownloadUrl
    Write-Host "Downloading Windows portable ZIP..." -ForegroundColor Blue
    Invoke-WebRequest -Uri $downloadUrl -OutFile $archivePath
}

function Format-TradeArkHttpUrl {
    param(
        [Parameter(Mandatory = $true)][string]$ResolvedHost,
        [Parameter(Mandatory = $true)][int]$ResolvedPort,
        [string]$Path = ""
    )

    $hostText = if ($ResolvedHost.Contains(":") -and -not $ResolvedHost.StartsWith("[")) {
        "[$ResolvedHost]"
    } else {
        $ResolvedHost
    }

    return "http://${hostText}:$ResolvedPort$Path"
}

function Get-TrimmedIpAddress {
    param([string]$Value)

    if ([string]::IsNullOrWhiteSpace($Value)) {
        return $null
    }

    $candidate = ($Value -replace "`r", "").Trim()
    if ([string]::IsNullOrWhiteSpace($candidate)) {
        return $null
    }

    $parsed = $null
    if ([System.Net.IPAddress]::TryParse($candidate, [ref]$parsed)) {
        return $parsed.IPAddressToString
    }

    return $null
}

function Get-PublicIpAddress {
    $uris = @(
        "https://api64.ipify.org",
        "https://api.ipify.org",
        "https://checkip.amazonaws.com",
        "https://ifconfig.me/ip",
        "https://ipinfo.io/ip"
    )

    foreach ($uri in $uris) {
        try {
            $response = Invoke-WebRequest -UseBasicParsing -Uri $uri -Method Get -TimeoutSec 5
            $candidate = Get-TrimmedIpAddress ([string]$response.Content)
            if ($candidate) {
                return $candidate
            }
        }
        catch {
        }
    }

    return $null
}

function Install-Archive {
    New-Item -ItemType Directory -Path $extractPath -Force | Out-Null
    New-Item -ItemType Directory -Path $resolvedInstallDir -Force | Out-Null

    Write-Host "Extracting portable package to $resolvedInstallDir ..." -ForegroundColor Green
    Expand-Archive -Path $archivePath -DestinationPath $extractPath -Force

    Get-ChildItem -Path $extractPath | ForEach-Object {
        Copy-Item $_.FullName -Destination $resolvedInstallDir -Recurse -Force
    }
}

function Register-OpenClawSkill {
    $executorPath = Join-Path $resolvedInstallDir "TradeArk.exe"
    if (-not (Test-Path $executorPath)) {
        Write-Host "OpenClaw skill registration skipped: TradeArk.exe not found." -ForegroundColor Yellow
        return
    }

    try {
        Write-Host "Registering OpenClaw skill..." -ForegroundColor Blue
        & $executorPath agents register-openclaw-skill
        if ($LASTEXITCODE -ne 0) {
            Write-Host "OpenClaw skill registration exited with code $LASTEXITCODE." -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "OpenClaw skill registration failed: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

function Launch-PortablePackage {
    if (-not $Launch) {
        return
    }

    if (-not (Test-Path $launcherPath)) {
        throw "Portable launcher not found at $launcherPath"
    }

    Write-Host "Launching TradeArk from $launcherPath ..." -ForegroundColor Green
    Start-Process -FilePath $launcherPath | Out-Null
}

function Show-Completion {
    $localUiUrl = Format-TradeArkHttpUrl -ResolvedHost "127.0.0.1" -ResolvedPort $Port -Path "/"
    $publicIp = Get-PublicIpAddress

    Write-Host ""
    Write-Host "Portable package extracted to: $resolvedInstallDir" -ForegroundColor Green
    Write-Host "Start later with: $launcherPath" -ForegroundColor Green
    Write-Host "Local UI: $localUiUrl" -ForegroundColor Green
    if ($publicIp) {
        Write-Host ("Remote UI: " + (Format-TradeArkHttpUrl -ResolvedHost $publicIp -ResolvedPort $Port -Path "/")) -ForegroundColor Green
        Write-Host ("Remote API: " + (Format-TradeArkHttpUrl -ResolvedHost $publicIp -ResolvedPort $Port)) -ForegroundColor Green
    } else {
        Write-Host "Remote UI: auto-detect unavailable. Use this machine's public IP with port $Port." -ForegroundColor Yellow
    }
    Write-Host "First open: choose public access or username/password access for the local Web UI." -ForegroundColor Green
    Write-Host "Reset later from Settings > Web UI Access or with: $resolvedInstallDir\TradeArk.exe web-ui set-password --username <name>" -ForegroundColor Green
    Write-Host "Clear login lockouts with: $resolvedInstallDir\TradeArk.exe web-ui clear-login-locks" -ForegroundColor Green
    Write-Host "Re-register OpenClaw skill with: $resolvedInstallDir\TradeArk.exe agents register-openclaw-skill" -ForegroundColor Green
}

function Main {
    Confirm-Installation
    Show-CompatibilityWarning
    Download-Archive
    Install-Archive
    Register-OpenClawSkill
    Launch-PortablePackage
    Show-Completion
}

Main
