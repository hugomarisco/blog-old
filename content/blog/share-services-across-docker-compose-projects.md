---
title: "share services across docker-compose projects"
date: 2017-03-08T23:58:42Z
draft: false
---

if you use docker-compose as part of your development process you probably needed to share some services across (docker-compose) projects.

let’s say you have two projects that share a common queue:

**sleepy project #1**

```yaml
# p1/docker-compose.yaml

version: '3'

services:
  [...other services...]
  fake-queue:
    image: busybox
    entrypoint: 'sh -c "(ip addr show | grep eth0) && sleep 1000000"'
```

**sleepy project #2**

```yaml
# p2/docker-compose.yaml

version: '3'

services:
  [...other services...]
  fake-queue:
    image: busybox
    entrypoint: 'sh -c "(ip addr show | grep eth0) && sleep 1000000"'
```

if you spin up these compose projects, each will have it’s own network and the same service fake-queue will be created twice (once in each network).

you also won’t be able to communicate with the instances outside your project’s network.

```bash
~/p1/ $ docker-compose up

Creating p1_busybox_1
Attaching to p1_busybox_1
busybox_1  | 60: eth0@if61: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue
busybox_1  |     inet 172.20.0.2/16 scope global eth0
```

```bash
~/p2/ $ docker-compose up

Creating p2_busybox_1
Attaching to p2_busybox_1
busybox_1  | 60: eth0@if61: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue
busybox_1  |     inet 172.20.0.2/16 scope global eth0
```

now imagine that you work on a team and some people are working on **sleepy project #1** while others are working on **#2**.

it would be nice if you could just clone their project, run their `docker-compose.yml` and your services be able to access the common queue.

---

when docker-compose runs it will namespace your project using `COMPOSE_PROJECT_NAME` environment variable, `-p/--project-name` command-line option or, if both are missing, the project’s directory name.

this namespacing is what keeps things like networks separated.

if you want to share a network across your projects use the same project name - making docker-compose re-use the network if it’s already created.

also, if a service with the same name is already running it will just attach to the running instance instead of re-creating it.

```bash
~/p1/ $ docker-compose up -p my_project

Creating network "testproject_default" with the default driver
Creating testproject_busybox_1
Attaching to testproject_busybox_1
busybox_1  | 63: eth0@if64: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue
busybox_1  |     inet 172.22.0.2/16 scope global eth0
```

```bash
~/p2/ $ docker-compose up -p my_project

testproject_busybox_1 is up-to-date
Attaching to testproject_busybox_1
busybox_1  | 67: eth0@if68: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue
busybox_1  |     inet 172.22.0.2/16 scope global eth0
```

for more information read docker-compose’s network documentation [here][1].

[1]: https://docs.docker.com/compose/networking