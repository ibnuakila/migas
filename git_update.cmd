@ECHO OFF
cd c:/xampp-8.0/htdocs/sicaki-migas
ECHO ON
git remote -V
git fetch https://ibnuakila@github.com/ibnuakila/migas.git +refs/heads/master:refs/remotes/origin/master
git merge --ff origin/master
