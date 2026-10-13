# 2.7 — Internet Gateway: what makes a subnet public

> Module 2 · The VPC · Lesson 7 of 11 · ⏱️ 9 min read · 💚 Cost: $0

## 🎯 What you'll build today

You are going to answer a question almost nobody can answer: **what makes a
subnet public**. It is not a checkbox. It is not the name you gave it. By the
end you will have an Internet Gateway attached to your VPC and a route that
uses it. And you will be able to point your finger at the one line that turns a
subnet public.

## 🤔 Before we start

1. At home, what would happen if your router had a fiber cable but nobody had
   told your computer that router existed?
2. When you followed a packet's journey, a route appeared that served for
   "everything else". Why was it needed, if there were already specific routes?
3. An office building has a door to the street. Is that enough for somebody to
   get out from an office on the ninth floor?

## 📐 The idea

So far your VPC is a closed building. It has floors and offices, which are the
subnets. It has internal corridors, which are the `local` route you saw in the
previous lesson. What it does not have is a door to the street.

The **Internet Gateway** is that door. It is created separately and then
attached to a VPC. A VPC can have only one, and a gateway can be attached to
only one VPC at a time.

But here is the part that confuses everybody. **Putting the door in does not
open the way to it.** An employee on the ninth floor also needs somebody to tell
them how to get down. That is the route table.

And that is the real definition, the one almost nobody says out loud:

> A subnet is public **if its route table has a route towards an Internet
> Gateway**. Nothing more. There is no checkbox called "public" anywhere in the
> console.

The route that gets added is the default route, `0.0.0.0/0`. It means "any
destination". There is the third question from the start. The door exists, but
the sign saying that is the way out is needed too.

This is what your network looks like today, with the new piece marked:

```text
   ┌─ VPC redes-vpc-principal  10.0.0.0/16 ──────────────┐
   │                                                     │
   │  ┌── redes-subred-publica-a ──┐                     │
   │  │  10.0.1.0/24               │                     │
   │  │  table: redes-rt-publica   │                     │
   │  │    10.0.0.0/16 → local     │                     │
   │  │    0.0.0.0/0   → igw   ◄── NEW                   │
   │  └────────────────────────────┘                     │
   │                                                     │
   │  ┌── redes-subred-privada-a ──┐                     │
   │  │  10.0.11.0/24              │                     │
   │  │  table: redes-rt-privada   │                     │
   │  │    10.0.0.0/16 → local     │  (no way out)       │
   │  └────────────────────────────┘                     │
   │                                                     │
   └──────────────────┬──────────────────────────────────┘
                      │  redes-igw   ◄── NEW
                   internet
```

There is a second thing the gateway does that the door analogy does not cover.
Your instance does not have a public address on its network card: on the inside
it only knows its `10.0.1.x`. When the packet leaves, the gateway **changes the
source address** to the public address. When the reply comes back, it makes the
change in reverse. It is a one-to-one translation, invisible from inside.

## 🛠️ Hands on

> 📍 Course region: **us-east-1 (N. Virginia)**. Check it in the top right
> before you start. Creating something in another region and then not finding it
> is the most common mistake at the beginning.

**1.** Go to `VPC → Internet gateways → Create internet gateway`.

| Field | Value |
|---|---|
| Name tag | `redes-igw` |
| Extra tag | Key `curso`, value `redes-aws` |

*You should see:* the gateway created, in state **Detached**. It exists, but it
does not belong to any network yet. A door leaning against the floor.

**2.** With the gateway selected, go to `Actions → Attach to VPC`. Choose
`redes-vpc-principal` and confirm.

*You should see:* the state change to **Attached**, with your VPC's identifier
appearing next to it.

**3.** Go to `VPC → Route tables` and select `redes-rt-publica`, the one you
created in the previous lesson. Open the `Routes` tab and click `Edit routes`.

*You should see:* a single row, `10.0.0.0/16` with target `local`. That row
cannot be deleted or changed.

**4.** Click `Add route` and fill in the new row.

| Field | Value |
|---|---|
| Destination | `0.0.0.0/0` |
| Target | `Internet Gateway` and then `redes-igw` |

Save with `Save changes`.

**5.** Before moving on, open the `Subnet associations` tab of that same table.
`redes-subred-publica-a` has to be there, and only that one.

*You should see:* one associated subnet. If the private one appears, you have
just made it public by accident. Look at the first fault in the section below.

**6.** Now open `redes-rt-privada` and look at its routes. Do not touch
anything. Compare: one table has two rows and the other has one. That difference
is everything.

**7.** One detail is missing. Go to `VPC → Subnets`, select
`redes-subred-publica-a` and go to `Actions → Edit subnet settings`. Tick
`Enable auto-assign public IPv4 address` and save.

*You should see:* in the subnet's summary, `Auto-assign public IPv4 address:
Yes`. Without this, the instances you launch there would be born with no public
address. And an instance with no public address cannot use the door.

## ▶️ Check it works

Open `redes-rt-publica` and look at the `Routes` tab. There have to be exactly
two rows, both in state `Active`:

```text
Destination      Target          Status
10.0.0.0/16      local           Active
0.0.0.0/0        igw-0a1b2c3d…   Active
```

And `redes-rt-privada` has to still have only one:

```text
Destination      Target          Status
10.0.0.0/16      local           Active
```

That is everything that tells a public subnet apart from a private one in AWS.

There is no traffic to test yet, because there is no machine inside. The real
test, with an instance replying from the internet, is lesson 2.8. Today the
check is a reading one. That is how most network problems are diagnosed in real
work: by looking at the table, not by firing off pings.

## 🧯 If something breaks

**You added the route and now the private subnet goes out to the internet too.**
Cause: you put the route in the main table, not in `redes-rt-publica`. The main
table applies to every subnet that has no other one explicitly associated.
Fix: delete the `0.0.0.0/0` route from the main table and add it in
`redes-rt-publica`. Then check its associations.

**The gateway does not appear in the list of targets when you add the route.**
Cause: it is created but not attached to this VPC. Only the ones in state
`Attached` are offered.
Fix: go back to step 2.

**The route appears in state `Blackhole`.**
Cause: the route points at something that is no longer there, nearly always a
gateway that got detached. The packets taking it are discarded in silence.
Fix: attach the gateway again, or delete the route. `Blackhole` is the word you
are going to see most in your diagnoses, and it always means the same thing.

**It will not let you attach the gateway to the VPC.**
Cause: there is already another gateway attached to that VPC. Only one is
allowed.
Fix: find the spare one in the list and delete it, if nobody is using it.

## 🧹 What stays running

**What you created:** the Internet Gateway `redes-igw`, a route in
`redes-rt-publica`, and a setting on the public subnet.

**What gets deleted now:** nothing. Everything from today is needed for the rest
of the module.

**What stays alive:**

| Resource | Cost while it lives | Deleted in |
|---|---|---|
| `redes-igw` | Free. A gateway is not charged for | lesson 8.6 |
| Route `0.0.0.0/0` | Free | lesson 8.6 |

It is worth understanding why this is free, because it is the exception. The
gateway costs nothing: it is not a machine of yours, it is a capability of the
AWS network. What does get charged is **data leaving** towards the internet, per
gigabyte. Coming in is free and going out is paid for, and that holds for the
whole cloud.

**Check nothing extra was left behind:** under `VPC → Internet gateways`, filter
by the tag `curso = redes-aws`. There has to be one, and in state `Attached`.

## 🔁 Check yourself

1. What exactly makes a subnet public?
2. You created a gateway and attached it, but no instance goes out to the
   internet. What is the first thing you look at?
3. What does it mean for a route to be in state `Blackhole`?
4. An instance in the public subnet is born with no public address. Which
   setting is missing?

**Answers:** One, that its route table has a route towards an Internet Gateway.
There is no public subnet checkbox anywhere. Two, which route table that
specific subnet has associated. The usual confusion is having added the route in
the main table. Three, that the route points at a destination that no longer
exists. The packets taking it are discarded with no notice. Four, enabling
`Auto-assign public IPv4 address` on the subnet. You can also give it an address
by hand when creating the instance.

## 🎒 Something to think about

A subnet is public purely by having that route. What would happen if you took it
away from a subnet with servers already running? Think about two things
separately. The connections coming in from outside, and the ones the machine
itself opens. They are not the same case, and the difference is going to matter
a lot when you see the NAT Gateway.
