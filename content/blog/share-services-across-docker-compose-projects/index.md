---
title: Share services across Docker Compose projects
description: Learn how to share a common service across multiple Docker Compose projects
date: 2017-03-08T23:58:42Z
---

If you use docker-compose as part of your development process you probably had the need of sharing some services across Docker Compose projects.

Let’s say you have two projects that share a common service:

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

If you spin up these Docker Compose projects, each will have its own network and `fake-queue` will be created twice.

You also won’t be able to communicate with the instances outside your project’s network.

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

Now imagine that you work on a team and some people are working on **sleepy project #1** while others are working on **sleepy project #2**.

It would be nice if you could just clone their project, run their `docker-compose.yml` and be able to access `fake-queue`.

---

When docker-compose runs, it will namespace your project using `COMPOSE_PROJECT_NAME` environment variable, `-p/--project-name` command-line option or, if both are missing, the project’s directory name.

This namespacing is what keeps things like networks separated.

If you want to share a network across your projects use the same project name - making Docker Compose re-use the network if it’s already created.

Also, if a service with the same name is already running it will just attach to the running instance instead of re-creating it.

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

For more information check Docker Compose’s network documentation [here][1].

Happy coding!

[1]: https://docs.docker.com/compose/networking
