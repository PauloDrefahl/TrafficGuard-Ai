import os
import subprocess
import sys

# === Configuration ===
REPO_PATH = "/Users/paulodrefahl/Desktop/Projects/trafficguard-AI"  # local repo path
COMMIT_MESSAGE = "trafficguard 1.6v"
COMMIT_DATE = "2025-07-28T08:00:00"  # YYYY-MM-DDTHH:MM:SS

# === Helpers ===
def run(command, cwd=None, env=None, allow_fail=False):
    """Run a shell command and return (stdout, stderr, code)."""
    res = subprocess.run(
        command,
        cwd=cwd,
        env=env,
        text=True,
        capture_output=True,
    )
    if not allow_fail and res.returncode != 0:
        pretty = " ".join(command)
        msg = res.stderr.strip() or res.stdout.strip()
        raise RuntimeError(f"Command failed [{pretty}]: {msg}")
    return res.stdout.strip(), res.stderr.strip(), res.returncode

def ensure_repo(path):
    if not os.path.isdir(path):
        raise FileNotFoundError(f"Repository path does not exist: {path}")
    if not os.path.isdir(os.path.join(path, ".git")):
        raise RuntimeError(f"Not a git repository: {path}")

def get_remote_default_branch(cwd):
    """
    Returns the default remote branch name (e.g., 'master' or 'main').
    Tries the robust origin/HEAD method first; falls back to parsing `git remote show origin`.
    """
    out, _, code = run(["git", "symbolic-ref", "--short", "refs/remotes/origin/HEAD"], cwd=cwd, allow_fail=True)
    if code == 0 and out:
        # e.g., "origin/master" -> "master"
        return out.split("/", 1)[1]

    # Fallback: parse `git remote show origin`
    out, _, code = run(["git", "remote", "show", "origin"], cwd=cwd, allow_fail=True)
    if code == 0 and out:
        for line in out.splitlines():
            line = line.strip()
            if line.startswith("HEAD branch:"):
                return line.split(":", 1)[1].strip()

    # Last resort: use current local branch
    out, _, code = run(["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=cwd, allow_fail=True)
    if code == 0 and out and out != "HEAD":
        return out.strip()

    raise RuntimeError("Unable to determine default remote branch (origin/HEAD).")

def get_current_branch(cwd):
    out, _, _ = run(["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=cwd)
    return out.strip()

def branch_exists_remote(cwd, branch):
    _, _, code = run(["git", "ls-remote", "--exit-code", "--heads", "origin", branch], cwd=cwd, allow_fail=True)
    return code == 0

def set_upstream_if_needed(cwd, local_branch, remote_branch):
    # Check upstream
    out, _, code = run(["git", "rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"], cwd=cwd, allow_fail=True)
    if code == 0 and out:
        return  # upstream already set
    # Set upstream to origin/<remote_branch>
    run(["git", "branch", "--set-upstream-to", f"origin/{remote_branch}", local_branch], cwd=cwd)

def main():
    try:
        ensure_repo(REPO_PATH)
        os.chdir(REPO_PATH)

        # Make sure we have origin
        out, _, code = run(["git", "remote", "-v"], cwd=REPO_PATH, allow_fail=True)
        if code != 0 or "origin" not in out:
            raise RuntimeError("No 'origin' remote found. Add it with: git remote add origin <url>")

        # Determine branches
        default_remote_branch = get_remote_default_branch(REPO_PATH)
        local_branch = get_current_branch(REPO_PATH)

        # If local branch differs (e.g., you're on master, default is main), prefer the remote default if it exists
        # but don't force checkout; just pull/push against the correct branch names.
        if not branch_exists_remote(REPO_PATH, default_remote_branch):
            raise RuntimeError(
                f"Remote branch 'origin/{default_remote_branch}' does not exist. "
                f"Check your GitHub repo branches."
            )

        # Stage
        print("Adding changes...")
        run(["git", "add", "."], cwd=REPO_PATH)

        # Commit only if there are changes
        status_out, _, _ = run(["git", "status", "--porcelain"], cwd=REPO_PATH)
        if not status_out.strip():
            print("No changes to commit.")
        else:
            print("Committing changes...")
            env = os.environ.copy()
            env["GIT_COMMITTER_DATE"] = COMMIT_DATE
            run(["git", "commit", "--date", COMMIT_DATE, "-m", COMMIT_MESSAGE], cwd=REPO_PATH, env=env)

        # Always fetch first (helps origin/HEAD correctness)
        run(["git", "fetch", "origin", "--prune"], cwd=REPO_PATH)

        # Rebase with autostash against the remote default branch
        print(f"Pulling latest changes from GitHub (origin/{default_remote_branch})...")
        # If your local branch name differs, still rebase your current HEAD onto the remote default
        run(["git", "pull", "--rebase", "--autostash", "origin", default_remote_branch], cwd=REPO_PATH)

        # Ensure upstream (so future plain `git pull` works)
        try:
            set_upstream_if_needed(REPO_PATH, local_branch, default_remote_branch)
        except Exception:
            # Non-fatal if we can't set upstream (e.g., detached HEAD)
            pass

        # Push to the same remote branch we pulled from
        print(f"Pushing changes to GitHub (origin/{default_remote_branch})...")
        run(["git", "push", "origin", f"HEAD:{default_remote_branch}"], cwd=REPO_PATH)

        print("✅ Changes successfully committed and pushed to GitHub.")

    except RuntimeError as e:
        print(f"Error: {e}")
        sys.exit(1)
    except FileNotFoundError as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
