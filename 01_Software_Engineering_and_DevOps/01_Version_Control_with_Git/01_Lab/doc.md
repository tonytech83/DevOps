<h1 align="center">Git Branching and Pull Requests</h1>
<h2 align="center">Branches in Source Control Systems</h2>

<br>

<h3>Table of Contents</h3>

<ol>
<li><a href="#1">Source Control System</a></li>
<li><a href="#2">Git</a></li>
<li><a href="#3">GitHub</a></li>
<li><a href="#4">Basic Git Commands</a></li>
<li><a href="#5">Git Conflicts</a></li>
<li><a href="#6">Branching Concepts and Branching in Git</a></li>
<li><a href="#7">Git Branching Commands</a></li>
<li><a href="#8">Branching Strategies</a></li>
<li><a href="#9">Common Git Branching Strategies</a></li>
<li><a href="#10">Pull Requests in GitHub</a></li>
<li><a href="#11">The Pull Request Process</a></li>
</ol>

<br>

<h2 align="center" id="1">Version control system</h2>
<h3>Software Configuration Management (SCM)</h3>

- Version Control System ≈ Source Control System
  - Tool for managing the changes during the development
  - A repository keeps the source code and other project assets
    - Keeps a full history of all changes during the time
      - Change log shows who, when and why changed what
  - Solves conflicts on concurrent changes
    - Allows reverting of old versions
- Popular source control systems
  - Git – distributed source control (hierarchical)
  - Subversion (SVN) – central repository (centralized)

<br>

<h3>Distributed Version Control (DVC)</h3>

- Unlike a CVC system, a DVC doesn't have a single point of failure
- Developers clone repositories on their DVC workstations, creating multiple backup copies
- Example: Git

<br>

<h3>Centralized Version Control (CVC)</h3>

- A CVC system relies on a central server where developers
commit changes
- Example: Subversion (SVN)

<br>

<h2 align="center" id="2">Git</h2>
<h3 align="center">Global Information Tracker</h3>

<h3>What is Git?</h3>

- **Git**
  - Distributed <span color="orange">source-control</span> system
  - The most popular source control in the world
  - Free open-source software
  - Works with local and remote repositories
  - Runs on Linux, Mac OS and Windows
- **GitHub**
  - Social network for developers
  - Free project hosting site with Git repository

<h3>Vocabulary</h3>

- **Repo** (repository) - Holds the project in a remote server
- **Branch** - Parallel development path (separate version of the project)
- **Merge branches** - Merge two versions of the same projects
- **Clone** - Download a local copy of the remote project
- **Commit** - Saves a set of changes locally
- **Pull** - Take and merge the changes from the Remote
- **Push** - Send local changes to the Remote

<br>

<h2 align="center" id="3">GitHub</h2>
<h3 align="center">Source Code Hosting with Git</h3>

<h3>What is GitHub?</h3>

- **GitHub**
  - Platform and cloud-based service, based on Git
  - World's most used source code host
  - Used for software development and version control
    - Free for open-source projects and small private projects
    - Paid plans for private repositories with advanced features
- **GitHub Desktop**
  - Enables interacting with GitHub using a GUI instead of the command line or a web browser

<h3>GitHub Features</h3>

- **Access control**
- **Bug tracking** (Issue tracker)
- **Continuous Integration** (Actions)
- **Wiki pages** (Documentation)
- **Software feature request**
- **Task management**
- **Project board** (Kanban style)
- Etc.

<br>

<h2 align="center" id="4">Basic Git Commands</h2>
<h3 align="center">Clone ⟶ Modify ⟶ Add ⟶ Commit ⟶ Push</h3>

<h3>Basic Git Commands</h3>

- Clone an existing Git repository
```shell
git clone [remote url]
```
- Fetch and merge the latest changes from the remote repository
```shell
git pull
```
- Prepare (add / select) files for a commit
```shell
git add [filename] ("git add ." adds everything)
```
- Commit to the local repository
```shell
git commit –m "[your message here]"
```
- Log - check log of current repository
```shell
git log
```
- Check the status of your local repository (see the local changes)
```shell
git status
```
- Create a new local repository (in the current directory)
```shell
git init
```
- Create a remote (assign a short name for remote Git URL)
```shell
git remote add [remote name] [remote url]
```
- Push to a remote (send changes to the remote repository)
```shell
git push [remote name] [local name]
```

<br>

<h2 align="center" id="5">Git Conflicts</h2>
<h3 align="center">Merging Git Conflicts</h3>

<h3>Git Conflict</h3>

- Conflicts generally arise when two or more people change the same file simultaneously
  - Or if a developer deletes a file while another developer is modifying it
- In these cases, Git cannot automatically determine what is correct
- Conflicts only affect the developer conducting the merge
- The rest of the team is unaware of the conflict

<br>

<h2 align="center" id="6">Branching Concepts & Branching in Git</h2>
<h3 align="center">Creating and Merging Branches</h3>

<h3>What is Branching?</h3>

- Branches allow you to work on different parts of a project without impacting the main / master branch
  - Serve as an abstraction for the edit / stage / commit process
- Represent a way to request a brand new working directory, staging area, and project history
  - Any new commits are recorded in the history for the current branch
    - Without impacting the main branch until it's decided to integrate the changes
- You can switch between branches and work on different projects without them interfering with each other

<h3>Branches == Built-In Feature of Git</h3>

- Branching is available in most version control systems
  - In some version control systems it can be an expensive operation in both time and disk space
- In Git, branches are a part of the everyday development process
- Git branches are an effective pointer to a snapshot of a developer's changes

<br>

<h2 align="center" id="7">Git Branching Commands</h2>
<h3 align="center">View / Switch / Delete Branches</h3>

<h3>Local vs. Remote Branches</h3>

- Local branch
  - Branch in your local Git repo
  - Changes tracked only locally
- Remote branch
  - Branch inside the remote repository (e.g. in GitHub)
- Upstream branch
  - Remote branch, connected to your local branch
  - When you push changes, they are sent to the upstream branch

<h3>Git Branching Commands</h3>

- Create a new local branch
```shell
git branch {branch-name}
```
- Switch to certain existing branch
```shell
git switch {branch-name}
git checkout {branch-name}
```
- Create a new branch and switch to it
```shell
git checkout -b {branch-name}
```
- List all local and remote branches
```shell
git branch --all
git branch -a
```
- List local together with the last commit message
```shell
git branch --verbose
git branch -vv

```
- List all local and remote branches with the last commit message
```shell
git branch --all --verbose
git branch –a -vv
```
- List local branches
```shell
git branch
```
- Push to a new upstream (in a new remote branch)
```shell
git push --set-upstream origin {branch-name}
git push -u origin {branch-name}
```
- Merge another branch in the active branch
```shell
git merge {branch-name}
```
- Delete a local branch
```shell
git branch -d {branch-name}
```
- Delete a remote branch
```shell
git push origin -d {branch-name}
```
- Reapply commits on top of another base tip
```shell
git rebase {base-branch-name}
```
- Include specific commits without merging the entire branch
```shell
git cherry-pick {branch-name}
```

<h3>Git Squash</h3>

- Combining multiple commits into a single commit
- Useful for cleaning up commit history before merging a feature branch into the main branch
  - Makes commit history simpler and more understandable
- Usually applied during use of other commands, e.g.
  - *git rebase*
  - *git merge*
- Rewrites history and must be used with caution!

<br>

<h2 align="center" id="8">Branching Strategies</h2>
<h3 align="center">Strategy Simple Branch</h3>

<h3>What is a Branching Strategy?</h3>

- Branching strategy
  - A strategy that programmers adopt while writing, merging and deploying code when using a VCS
- It is essentially a set of rules that developers can follow to stimulate how they interact with a shared codebase
- It enables teams to work in parallel to achieve faster releases and fewer conflicts
  - By creating a clear process when making changes to source control

<h3>Purposes of Branching Strategy</h3>

- Enhance productivity by ensuring proper coordination among developers
- Help organize a series of planned, structured releases
- Map a clear path when making changes to software through to production
- Maintain a bug-free code
- Enable parallel development

<br>

<h2 align="center" id="9">Common Git Branching Strategies</h2>

<h3>Trunk-Based Development</h3>

- Trunk-based development
  - "No branches" strategy
  - Developers integrate their changes into a shared trunk at least once a day
- Make smaller changes more frequently and commit directly into the trunk (without the use of branches)
  - This shared trunk should be ready for release anytime
- This strategy is suited to more senior developers

<h3>GitHub Flow</h3>

- GitHub Flow
  - Lightweight and flexible development workflow
  - Each feature is implemented in its own branch
  - Keep the master code in a constant deployable state
- Before merging, each branch comes through a Pull Request and code review, then the changes are tested and integrated

<h3>Git Flow</h3>

- GitFlow
  - Enables parallel development
  - Devs can work separately from the master branch on features
- This strategy contains separate and straightforward branches for specific purposes
  - Ideal to handle multiple versions of the product

<h3>GitFlow Branches</h3>

- Master (main)
  - Holds the active production code
- Release
  - Help prepare a new production release
- Hotfix
  - Hotfix branches arise from a bug that has been discovered and must be resolved
- Develop
- Feature
  - Develop new features

<h3>GitLab Flow</h3>

- GitLab Flow
  - Combines feature-driven development and feature branching with issue tracking
  - Each feature is implemented in its own branch
  - Developers work with the main branch right away
  - The main branch is deployed to production (manually or auto)

<h3>Best Branching Strategy for Your Team</h3>

|Product type and its release method|Team size|Collaboration maturity|Applicable mainstream branch mode|
|-|-|-|-|
|All|Small team|High|Trunk-based Dev|
|Products that support continuous deployment and release|Middle|Moderate|GitHub-Flow and Trunk-based Dev|
|Products with a definite release window and a periodic version release cadence|Middle|Moderate|Git-Flow and GitLab-Flow with release branch|
|Basic platform products|Middle|Moderate|GitLab-Flow|
|Products demanding product quality and have a long maintenance cycle for released versions|Large|Moderate|Git-Flow|

<h3>No Standard for "Branching Strategy"</h3>

- Different organizations use different branching
strategies for each different team / project
  - There is no "best branching strategy"
  - How to use branches highly depends on
    - The team
    - The project under development


<br>

<h2 align="center" id="10">Pull Requests in GitHub</h2>
<h3 align="center">Show Changes You’ve Pushed</h3>

<h3>Pull Requests in GitHub</h3>

- Pull requests
  - A mechanism for developers to notify their team members that they have completed a feature
- The pull request is more than just a notification—it's a code review process, including discussions on the proposed feature
- If there are any problems with the changes, teammates can post feedback in the pull request
- This activity is tracked directly inside of the pull request

<h3>Pull Requests</h3>

- Pull requests let you tell others about changes you want to push to a branch in a repository on GitHub
- Once a pull request is opened, you can discuss and review the potential changes with collaborators
- You can create pull requests on GitHub.com, in GitHub Desktop or in other GitHub tools

<h3>Branch Protection Rules</h3>

- You can create a branch protection rule in a repo
  -Can be created for
    -A specific branch
    -All branches
    -Any branch that matches a name pattern you specify with fnmatch syntax
- For example, you can create a branch protection rule to prevent contributors from merging to a branch without an approved pull request

<br>

<h2 align="center" id="11">The Pull Request Process</h2>
<h3 align="center">Notify Team for a Completed Feature</h3>

<h3>Pull Request: The Process</h3>

- Create a feature branch
- Make and commit changes
- Open a pull request
- Resolve merge conflicts
- Request a review
  - Give feedback / comment
  - Approve and merge

<br>

<h2 align="center" id="11">Summary</h2>

- Git == distributed source control system
- GitHub == platform and cloud-based service, based on Git
- Branch == a new separate version of the main repository
- Build your branching strategy from several main concepts
- Pull requests let you tell others about changes you've pushed to a branch in a repository on GitHub
- Conflicts may appear when merging branches