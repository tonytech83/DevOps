<style>
    .blue {
        background-color: #0074D9;
        font-size: 18px;
        font-weight: bold;
        padding: 10px;
    }

    .h1 {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }

    .h2 {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .normal {
       font-size: 14px;
       text-align: center;
    }  

</style>

<p style="font-size: 24px; font-weight: bold; text-align: center;">Git Branching and Pull Requests</p>

<p class="h2">Branches in Source Control Systems</p>

<br>

<p style="background-color: #0074D9; font-size: 18px; font-weight: bold; padding: 10px;">Table of Contents</p>


<ol>
<li><a href="#1">Source Control System</a></li>
<li><a href="#2">Git</a></li>
<li>GitHub</li>
<li>Basic Git Commands</li>
<li>Git Conflicts</li>
<li>Branching Concepts and Branching in Git</li>
<li>Git Branching Commands</li>
<li>Branching Strategies</li>
<li>Common Git Branching Strategies</li>
<li>Pull Requests in GitHub</li>
<li>The Pull Request Process</li>
</ol>

<br>

<p class="h2" id="1">Source Control System</p>
<p class="normal">Version control system</p>

<p class="blue">Software Configuration Management (SCM)</p>

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

<p class="blue">Distributed Version Control (DVC)</p>

- Unlike a CVC system, a DVC doesn't have a single point of failure
- Developers clone repositories on their DVC workstations, creating multiple backup copies
- Example: Git

<br>

<p class="blue">Centralized Version Control (CVC)</p>

- A CVC system relies on a central server where developers
commit changes
- Example: Subversion (SVN)

<p class="h2" id="2">Git</p>
<p class="normal">Global Information Tracker</p>

**What is Git?**

- **Git**
  - Distributed source-control system
  - The most popular source control in the world
  - Free open-source software
  - Works with local and remote repositories
  - Runs on Linux, Mac OS and Windows
- **GitHub**
  - Social network for developers
  - Free project hosting site with Git repository

<p class="blue">Vocabulary</p>

**Repo** (repository) - Holds the project in a remote server

**Branch** - Parallel development path (separate version of the project)

**Merge branches** - Merge two versions of the same projects

**Clone** - Download a local copy of the remote project

**Commit** - Saves a set of changes locally

**Pull** - Take and merge the changes from the Remote

**Push** - Send local changes to the Remote