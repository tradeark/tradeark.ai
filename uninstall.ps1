param(
    [switch]$Yes,
    [switch]$NonInteractive,
    [switch]$RemoveData,
    [string]$InstallDir,
    [string]$DataDir
)

$ErrorActionPreference = "Stop"

function Confirm-TradeArkAction {
    param([string]$Message)
    if ($Yes -or $NonInteractive) {
        return $true
    }
    $reply = Read-Host "$Message [y/N]"
    return @("y", "Y", "yes", "YES") -contains $reply
}

function Remove-TradeArkDirectory {
    param([string]$Path)
    if (-not $Path -or -not (Test-Path -LiteralPath $Path)) {
        return
    }
    $allowed = @(
        (Join-Path $env:LOCALAPPDATA "TradeArk"),
        (Join-Path $env:USERPROFILE ".tradeark"),
        (Join-Path $env:USERPROFILE ".codex\skills\tradeark-local"),
        (Join-Path $env:USERPROFILE ".openclaw\plugin-skills\tradeark-local"),
        (Join-Path $env:USERPROFILE ".config\opencode\skills\tradeark-local"),
        (Join-Path $env:USERPROFILE ".claude\skills\tradeark-local"),
        (Join-Path $env:USERPROFILE ".agents\skills\tradeark-local")
    )
    $resolvedTarget = [System.IO.Path]::GetFullPath($Path)
    $isAllowed = $false
    foreach ($candidate in $allowed) {
        if ($resolvedTarget -ieq [System.IO.Path]::GetFullPath($candidate)) {
            $isAllowed = $true
            break
        }
    }
    if (-not $isAllowed) {
        Write-Warning "Refusing to recursively remove unexpected path: $Path"
        return
    }
    Remove-Item -LiteralPath $Path -Recurse -Force
    Write-Host "Removed $Path"
}

if (-not $InstallDir) {
    $InstallDir = Join-Path $env:LOCALAPPDATA "TradeArk"
}
if (-not $DataDir) {
    $DataDir = Join-Path $env:USERPROFILE ".tradeark"
}

Write-Host "TradeArk uninstaller"
Write-Host "Install directory: $InstallDir"
Write-Host "Data directory:    $DataDir"
if ($RemoveData) {
    Write-Warning "Local data will be removed."
} else {
    Write-Host "Local data will be kept."
}

if (-not (Confirm-TradeArkAction "Continue uninstalling TradeArk?")) {
    Write-Host "Cancelled."
    exit 0
}

$serviceBinaryCandidates = @(
    (Join-Path $InstallDir "tradeark.exe"),
    (Join-Path $InstallDir "TradeArk.exe")
)
foreach ($binary in $serviceBinaryCandidates) {
    if (Test-Path -LiteralPath $binary) {
        try {
            & $binary service uninstall | Out-Null
        } catch {
            Write-Warning "Service uninstall command failed for ${binary}: $($_.Exception.Message)"
        }
    }
}

Remove-TradeArkDirectory -Path $InstallDir

$skillDirs = @(
    (Join-Path $env:USERPROFILE ".codex\skills\tradeark-local"),
    (Join-Path $env:USERPROFILE ".openclaw\plugin-skills\tradeark-local"),
    (Join-Path $env:USERPROFILE ".config\opencode\skills\tradeark-local"),
    (Join-Path $env:USERPROFILE ".claude\skills\tradeark-local"),
    (Join-Path $env:USERPROFILE ".agents\skills\tradeark-local")
)
foreach ($skillDir in $skillDirs) {
    Remove-TradeArkDirectory -Path $skillDir
}

if ($RemoveData) {
    Remove-TradeArkDirectory -Path $DataDir
} else {
    Write-Host "Kept local data at: $DataDir"
}

Write-Host "TradeArk uninstall complete."
