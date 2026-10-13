# 1.10 — Ports and protocols: what "443" is

> Module 1 · Networking without the cloud · Lesson 10 of 13 · ⏱️ 8 min read · 💚 Cost: $0

## 🎯 What you'll understand today

What a port is and why the address on its own is not enough to deliver
anything. You are going to understand where the numbers you will write in every
firewall rule come from. And you are going to see the difference between TCP and
UDP. That difference explains why some things cut out and others come through in
jumps.

## 🤔 Before we start

1. In lesson 1.7 we saw which route wins when a destination fits two. What was
   the rule?
2. A machine can be serving a web page and receiving mail at the same time. How
   does it know which is which?
3. With registered mail you sign on receipt. With a postcard you do not. When is
   each one worth it?

## 📐 The idea

The IP address takes you as far as the machine. That is the building.

But inside a machine there are many programs running at once. A web server, a
database, a mail service. When a packet arrives, somebody has to decide which of
them to hand it to.

That somebody uses the **port**. It is a number from 0 to 65535 written on every
packet, next to the address. The address is the building and the port is the
office number.

A program that wants to receive connections **starts listening** on a port. From
that moment on, everything arriving at that number is its.

Some numbers are agreed by custom, and these are worth knowing:

| Port | What for | Where you will see it |
|---|---|---|
| 22 | Logging in to a machine from a console | Administration rules |
| 80 | Unencrypted web | Nearly always redirects to 443 |
| 443 | Encrypted web | The most written rule in the world |
| 3306 | MySQL database | Rules between application and data |
| 5432 | PostgreSQL database | Same thing |

There is the second question from the start. The same machine serves the web and
the mail because each service listens on a different number.

The pair of address and port is what really identifies one end of a
conversation. `10.0.1.47:443` is one specific thing: that machine's web service.

## 🔬 In detail

One piece is missing. The packet carries **two** ports, not one: the destination
one and the source one.

The destination one is the well-known one, 443. The source one is chosen at
random by your machine among the high numbers, above 1024. Those are called
**ephemeral ports**, because they last as long as the conversation lasts.

That is what lets you have three tabs open on the same site. All three go to the
same server's 443, and they are told apart by their source port. It is the same
trick as the table in lesson 1.9.

Keep that idea of ephemeral ports close. It is the one that makes lesson 1.12
make sense.

The other piece is the **protocol**, which is the agreement about how you talk.
There are two that cover almost everything:

**TCP** (Transmission Control Protocol). Before sending anything, the two ends
greet each other and confirm they are there. Then they confirm the pieces as
they go, and whatever is lost is asked for again. Everything arrives and it
arrives in order. In exchange, it is slower and that initial greeting has to be
waited for.

**UDP** (User Datagram Protocol). It is sent and that is it. Nobody confirms
anything. If a piece is lost, it is lost. In exchange there is no wait and no
prior greeting.

There is the third question from the start:

| | TCP | UDP |
|---|---|---|
| Guarantees delivery | Yes | No |
| Keeps the order | Yes | No |
| Has an initial greeting | Yes | No |
| Used for | Web, mail, databases | Live video, games, DNS |

The criterion is easy to remember. If losing a piece ruins the result, TCP. If
arriving late is worse than losing something, UDP. A bank transfer cannot lose
data. A video call would rather skip a frame than freeze waiting for it.

What is left is saying where the office analogy stops working. In a building,
office 443 exists even if there is nobody inside. Here the port does not exist
until a program starts listening on it. If there is nobody, the machine replies
that there is nothing there, or does not reply at all.

## 🗺️ Where this shows up in AWS

Every rule of a security group in AWS has exactly this shape:

```text
   Type          Protocol    Port     Source
   HTTPS         TCP         443      0.0.0.0/0
   SSH           TCP         22       203.0.113.5/32
   PostgreSQL    TCP         5432     sg-de-la-aplicacion
```

Now you can read all three lines in full. The first allows encrypted web from
anywhere in the world. The second allows administration, but only from one exact
address, with the `/32` from lesson 1.4. The third allows the database to be
reached only from another group.

The console fills in the protocol and the port on its own when you pick the
type. It is convenient and it hides what is going on, so it is worth knowing
what is underneath.

One detail that saves a long diagnosis. In a security group **you do not need to
open the ephemeral ports for the return trip**. Somewhere else in AWS you do,
and that is exactly what the next lesson explains.

## ⚠️ Don't confuse it with

**Port with protocol.** The protocol is how you talk, the port is who with. A
rule needs both. Saying "open 443" without saying TCP is incomplete, even though
it is nearly always taken as read.

**Opening a port with something listening.** They are two things in different
places. Allow 443 in every rule in the world. If there is no program listening
there, nobody replies. The same happens the other way round. It is the first
pair to separate when something will not connect.

**The number with the service.** 443 being the web is a custom, not a law. A
server can listen for the web on 8443 perfectly well. Customs help you read a
rule at a glance, and nothing more.

## 🔁 Check yourself

1. What does the port add to what the address already did?
2. How many ports does a packet carry, and which are they?
3. Which do you choose if losing a piece ruins the result?
4. You allow 443 and the page does not load. What else has to be checked?

**Answers:** One, which program inside the machine the packet goes to. The
address reaches the building and the port the office. Two, it carries two. The
destination one, which is the well-known one, and the source one, chosen at
random among the high numbers. Three, TCP, because it confirms delivery and keeps
the order. Four, that there really is a program listening on that port.

## 🎒 Something to think about

DNS, which is lesson 1.11, uses UDP nearly always. It is odd: losing a DNS query
means not finding the page. Why do you think the protocol that guarantees
nothing was chosen? Think about how many queries your browser makes when opening
a single site, and how long each one lasts.
