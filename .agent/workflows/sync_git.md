---
description: safely sync local changes with github (stash -> pull -> pop -> push)
---

1. Stash any local changes to avoid conflicts during pull
// turbo
2. git stash

3. Pull the latest changes from the remote repository (using rebase to keep history clean)
4. git pull --rebase origin main
   
5. Restore local changes
// turbo
6. git stash pop

7. Stage all changes
// turbo
8. git add .

9. Commit the changes (User will be prompted for a message if run manually, or use a default here if preferred)
10. git commit -m "Sync with remote"

11. Push the changes to GitHub
// turbo
12. git push origin main
