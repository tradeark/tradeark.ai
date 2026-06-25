# 把 docs_website 发布到 tradeark/tradeark.ai

本文档只描述**手动执行步骤**。所有 `git push`、`gh repo`、token 粘贴都请你在本地 shell 里跑，本文不携带任何 token。

---

## 0. 先把旧 token 撤销（重要）

在对话里贴出的 `github_pat_11CGYZSGA0...` 已经以明文出现在聊天记录中，请立刻去撤销：

- 打开 https://github.com/settings/tokens
- 找到该 token（看前缀 `11CG...`、note、最后使用时间确认）
- 点 **Revoke**
- 重新签发一个，**Note** 填 `tradeark.ai docs deploy`，**Expiration** 选 30~90 天，**Scopes** 只勾 `repo`（仓库是 public 的话 `public_repo` 也行）
- 新 token **只在你本地 shell 里粘给 git/gh**，不要写进任何文件、聊天、commit、issue

---

## 1. 当前事实（已确认）

| 项 | 状态 |
|---|---|
| `docs_website/` 是独立目录 | 否，是当前 `signal_executor` 仓库里的普通子目录，183 个文件已被跟踪 |
| 当前外层仓库远端 | `https://github.com/tradeark/tradeark-web.git` |
| 目标远端 | `https://github.com/tradeark/tradeark.ai.git` |
| 工作树状态 | 3 个未提交 logo 改动，与 docs_website 无关 |
| `docs_website/.github/workflows/docs.yml` | 已生成（CI 用 GitHub Actions 源） |
| GitHub Pages 源 | 计划设为 **GitHub Actions**（不需要单独的 `gh-pages` 分支） |

> 这意味着 **不能**直接在 `docs_website/` 里 `git remote add ... tradeark.ai`。先要把它从外层仓库里拆出来。

---

## 2. 拆分并发布的两种方案

### 方案 A：`git subtree split`（保留 git 历史）

优点：保留 `signal_executor` 仓库里 `docs_website/` 的全部提交历史。
缺点：操作稍复杂；需要先在外层仓库里跑 `subtree split`，得到一个独立分支，然后从该分支推新仓库。

```powershell
cd C:\code\signal_executor

# 1. 暂存那 3 个未提交 logo 改动（避免 subtree split 时混入）
git stash push -u -m "docs-publish-stash" -- data/tradeark_logo.png rust_executor/ui/img/tradeark_logo.png signal.horse/app/static/img/tradeark_logo.png

# 2. 从 docs_website/ 子目录切出一个独立分支
git subtree split --prefix=docs_website -b docs-website-export

# 3. 在 GitHub 上创建空仓库 tradeark/tradeark.ai（不要勾 Add README/.gitignore/license）
#    操作路径：https://github.com/organizations/tradeark/repositories/new

# 4. 在 docs-website-export 分支上添加新远端并推送
git checkout docs-website-export
git remote add tradeark-ai https://github.com/tradeark/tradeark.ai.git
git push tradeark-ai docs-website-export:main

# 5. 回到 main，从外层仓库删除 docs_website/（先确认 docs 已经在新仓库可用）
git checkout main
git rm -r docs_website
git commit -m "Move docs to tradeark/tradeark.ai"

# 6. 把 stash 还原
git stash pop
```

### 方案 B：在 `docs_website/` 里 `git init`（简单，无历史）

优点：步骤最少，不动外层仓库。
缺点：丢失 git 历史（旧的 docs 提交关联会断）。

```powershell
cd C:\code\signal_executor\docs_website

# 1. 让外层仓库忽略 docs_website/（在父级 .gitignore 里加一行）
#    编辑 C:\code\signal_executor\.gitignore 加上：
#       docs_website/
#    然后在外层执行：
#       git rm -r --cached docs_website
#       git commit -m "Untrack docs_website (moved to tradeark/tradeark.ai)"

# 2. 在 docs_website/ 下初始化独立仓库
git init -b main
git add .
git commit -m "Initial docs_website import"

# 3. 在 GitHub 上创建空仓库 tradeark/tradeark.ai

# 4. 添加远端并推送（按提示输入 username + 新签发的 PAT 作为密码）
git remote add origin https://github.com/tradeark/tradeark.ai.git
git push -u origin main
```

> **推荐方案 A**，因为它保留历史；但如果你只是想"先跑起来"，方案 B 更快。

---

## 3. 推送时的认证（关键）

### 用 GitHub CLI（推荐，最少踩坑）

```powershell
# 一次性登录
gh auth login --web --git-protocol https

# 检查认证
gh auth status

# 之后所有 git push 都自动走 gh 的凭据，不需要再粘 token
```

### 或者一次性把 PAT 粘给 git

```powershell
# 把 PAT 临时塞进 remote URL（注意 URL 会带 token，请勿 commit）
git remote set-url origin https://x-access-token:<NEW_PAT>@github.com/tradeark/tradeark.ai.git

# 推送
git push -u origin main

# 推送完立刻把 remote URL 改回不带 token 的版本
git remote set-url origin https://github.com/tradeark/tradeark.ai.git
```

> **永远不要**把含 token 的 URL commit 到任何 `.git/config` 之外的可见文件。
> 如果你不小心提交了带 token 的 URL，立刻 **revoke** 那个 token 并重新签发。

---

## 4. 启用 GitHub Pages

1. 打开 https://github.com/tradeark/tradeark.ai/settings/pages
2. **Source** 选 **GitHub Actions**
3. 第一次 push 触发 `.github/workflows/docs.yml`，部署成功后页面会在 Actions 页面显示 ✅
4. 部署完成的 URL 默认是 `https://tradeark.github.io/tradeark.ai/`
5. （可选）自定义域：在仓库根放 `static/CNAME` 写 `docs.tradeark.ai`，并把 DNS CNAME 指向 `tradeark.github.io.`

> 注：当前 `docs_website/mkdocs.yml` 里 `site_url: https://docs.tradeark.ai/`。如果你暂时不上自定义域，建议先把这个改成 `https://tradeark.github.io/tradeark.ai/`，避免 canonical link 与实际部署地址不符。

---

## 5. 常见踩坑

| 现象 | 原因 | 处理 |
|---|---|---|
| `git subtree split` 后 `git push` 报 `non-fast-forward` | 新仓库不是空的（勾了 README/.gitignore） | 删掉仓库重建为空，或改用 `git push --force-with-lease`（先确认不会盖掉别人内容） |
| `mkdocs build --strict` 在 CI 里失败但本地能 build | 多语言 nav 顺序不一致、链了不存在的 .md | 看 Actions 日志的 `WARNING` 行，修正 `mkdocs.yml` |
| Pages 404 | 等 1~2 分钟（首次部署需要时间），或 Source 没选 GitHub Actions | 检查 https://github.com/tradeark/tradeark.ai/settings/pages |
| 推送时 403 / bad credentials | Token 已被撤销、过期，或 scope 不足 | 重新签发 token，确认勾了 `repo` |
| git 提示 `dubious ownership` | Windows 上偶尔出现 | `git config --global --add safe.directory '*'` |

---

## 6. 撤销 / 回滚

如果想撤销这次发布：

```powershell
# 在本地 docs 仓库里
git remote remove origin   # 解除远端（仓库本身保留）

# 在 GitHub 上 Settings -> Danger Zone -> Delete this repository
```

---

最后再强调：**任何 PAT 都不应出现在聊天、issue、commit、shell 历史里**。如果出现，立刻 revoke 重新签发。