# 1.13 — A packet's journey, end to end

> Module 1 · Networking without the cloud · Lesson 13 of 13 · ⏱️ 8 min read · 💚 Cost: $0

## 🎯 What you'll understand today

The twelve previous pieces, working together. You are going to follow a packet
from the moment you type an address until the page appears. By the end, module 1
stops being twelve loose concepts and becomes a journey. And that journey is the
one you are going to build with your own hands in module 2.

## 🤔 Before we start

1. In lesson 1.9 we saw why nobody can come in from outside without having been
   asked for something. What was the reason?
2. Before reading on, try to list what happens when you open a website. How
   many steps do you get?
3. Which part of that journey do you think fails most often?

## 📐 The idea

You type `tienda.ejemplo.com` and press enter. This is what happens, with the
number of the lesson where you saw it.

**One. Translate the name.** Your machine does not know what that name is. It
asks the DNS intermediary and receives an address, `203.0.113.40` (lesson 1.11).

**Two. Neighbor or not?** It compares that address with its own using the mask.
`203.0.113.40` is not in its neighborhood (lesson 1.3).

**Three. To the router.** Since it is not a neighbor, it hands it to the
gateway, the address ending in `.1` (lesson 1.3).

**Four. Choose a route.** The router looks at its table. No specific row
matches, so `0.0.0.0/0` wins (lessons 1.4 and 1.7).

**Five. Translate the address.** Your packet carries a private address that the
internet discards. The device at the border swaps it for the public one and
writes the translation down (lessons 1.8 and 1.9).

**Six. Cross the internet.** Dozens of routers repeat step four, each with its
own table. None of them knows the complete path (lesson 1.7).

**Seven. From the door to the office.** The packet has reached the right
building, which is the machine. Port 443 says which program inside to deliver it
to (lesson 1.10).

**Eight. Pass the check.** Before coming in, a firewall checks whether it is
allowed (lesson 1.12).

And then the return begins, which is where the interesting part is.

## 🔬 In detail

The way back is not the way out in reverse. It is a new journey, with its own
decisions, and each one can fail on its own.

```text
   OUT                           BACK

   name → address                the server replies
   neighbor? → no                neighbor? → no
   to the gateway                to its gateway
   route 0.0.0.0/0               route towards your public address
   NAT: changes the source       reaches the device at your border
   crosses the internet          NAT: finds the row and undoes it
   port 443 → the program        reaches your machine
   firewall: allowed?            firewall: allowed?
```

Notice the two NAT rows. On the way out it writes the translation, on the way
back it undoes it. If that row had expired, the reply would arrive and there
would be nobody to give it to.

And notice the two firewalls. They are two different checks, on different
machines. Stateful, the return one passes by itself. Stateless, it has to have
been allowed (lesson 1.12).

Out of all this comes the most useful thing in the module: **an order for
diagnosing**. When something will not connect, you check in this order, and not
another:

| Order | Question | If it fails here |
|---|---|---|
| 1 | Does the name resolve? | It is DNS, and the rest does not matter yet |
| 2 | Is there a route to the destination? | A row is missing from a table |
| 3 | Is there a route back? | The classic nobody looks at |
| 4 | Does the outbound firewall allow it? | A rule is missing |
| 5 | And the return one? | Only if it is one of the forgetful kind |
| 6 | Is anything listening on that port? | The network is fine, the program is not |

The order matters for a practical reason. Each step rules out a whole family of
causes. Starting at the end is what turns a five-minute diagnosis into a lost
afternoon.

## 🗺️ Where this shows up in AWS

The whole journey exists in AWS, under other names. This table is the bridge
into module 2, and it is worth coming back to when something does not add up:

| In module 1 | In AWS | Lesson |
|---|---|---|
| The network | The VPC | 2.1 |
| The neighborhood | The subnet | 2.4 |
| The gateway | The VPC's implicit router | 2.6 |
| The route table | The route table, the same | 2.6 |
| The way out to the internet | The Internet Gateway | 2.7 |
| The NAT at the border | The NAT Gateway | 2.9 |
| Stateful firewall | The security group | 3.1 |
| Stateless firewall | The access control list | 3.4 |
| The DNS intermediary | Route 53 | 7.5 |

No row of that table is an Amazon invention. They are the same pieces as always,
with the difference that you do not assemble them: you declare them.

That is the idea to close the module with. What you are going to do in the
console is not learning a product. It is writing, into AWS's forms, the decisions
you have just understood.

## ⚠️ Don't confuse it with

**The way out with the way back.** They are two independent journeys, and each
one can break on its own. It is the most frequent cause of the faults that look
impossible. That is why it takes up two rows of the diagnosis table.

**Something not connecting with the network failing.** The network can be
perfect and the destination program switched off. That is the last row of the
table. It is checked last for a reason: it is the least likely cause.

**A diagnosis with poking at things.** The temptation is to change a rule and
try. That works sometimes and hides the cause always. Walking the table in order
is slower on the first day and much faster from the second on.

## 🔁 Check yourself

1. What is the first thing your machine does when you type a name?
2. Why can the way back fail even though the way out works?
3. In what order are the causes checked when something will not connect?
4. Which AWS piece corresponds to the NAT at your home's border?

**Answers:** One, translate the name into an address by asking DNS. Two, because
it is a new journey, with its own route and its own firewall. Three, the name
first. Then the outbound route and the return one. Then the outbound permission
and the return one. And last, whether anything is listening. Four, the NAT
Gateway, which you will see in lesson 2.9.

## 🎒 Something to think about

Go back to the second question from the start and look at your list. How many of
the eight steps did you have? Which one were you missing? Keep that answer. What
was not on your list is what you are going to look at last when something fails.
And with an uncomfortable frequency, it is exactly where the problem is.
