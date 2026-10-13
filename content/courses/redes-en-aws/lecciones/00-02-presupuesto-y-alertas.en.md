# 0.2 — Your budget and your alerts, before you create anything

> Module 0 · Getting set up · Lesson 2 of 3 · ⏱️ 8 min read · 💚 Cost: $0

## 🎯 What you'll build today

You are going to leave a safety net in place. It is a budget that emails you
when your spend reaches 1, 5, and 10 dollars. It is ten minutes of work, and it
is the one thing in this course I ask you not to skip. If everything else
fails, this warns you.

## 🤔 Before we start

1. How long would it take you to notice that something you created a month ago
   is still running?
2. Why do you think surprise cloud bills are so famous, if the prices are
   published?
3. If a warning reaches you once you have already spent 300 dollars, is it any
   use to you?

## 📐 The idea

AWS charges for time switched on, not for use. A networking piece you create
and forget gives no signal: it does not slow down, fail, or write to you. It
just counts hours in silence until the receipt arrives.

There is the second question from the start. The prices are published, yes, but
nobody sits down to multiply 0.045 by 24 and by 30. And that comes to 32
dollars a month for a single forgotten resource.

AWS's answer to this is called **AWS Budgets**. You tell it how much you expect
to spend per month and which address to email. When your spend crosses the
threshold you set, it writes to you.

It is worth understanding what it does and does not do, because a lot of people
trust it too far:

- **It warns.** It sends you an email when you cross a threshold.
- **It cuts nothing off.** It does not shut resources down or block the
  account. The spending continues.
- **It looks backwards.** It tells you what you already spent, not what you are
  about to spend.

That is why the design matters. A 10-dollar budget that only warns at 100 %
writes to you once you are already 10 in. What works is setting **several
staggered alerts**, with the first one firing very early.

There is the third question from the start. A late warning does not stop the
spending: it only lets you find out. The one that really helps is the first.

And one decision worth explaining, because it looks backwards. The budget you
are about to set is **10 dollars**, not 100. It is not that you expect to spend
ten: it is that anything above that means something stayed running. The budget
number is not a forecast. It is the threshold above which you want to be
bothered.

## 🛠️ Hands on

> 📍 Course region: **us-east-1 (N. Virginia)**. Billing is global and does not
> depend on the region, but get used to looking at the selector in the top right
> starting today. The most common beginner mistake is creating something and
> then not finding it.

**1.** Sign in to the AWS console with your account. In the search bar at the
top, type `Billing and Cost Management` and open it.

*You should see:* a dashboard with the current month's spend. If the account is
new, it almost certainly reads 0.00 USD.

**2.** In the left-hand menu, open `Budgets` and click `Create budget`.

*You should see:* a screen that lets you choose between templates and an option
to customize.

**3.** Choose `Customize (advanced)` and then, for the budget type, `Cost
budget`. Continue.

**4.** Fill in the budget with these values.

| Field | Value |
|---|---|
| Budget name | `redes-aws-presupuesto` |
| Period | `Monthly` |
| Budget renewal type | `Recurring budget` |
| Budgeting method | `Fixed` |
| Enter your budgeted amount | `10` |

*You should see:* a summary that says 10.00 USD per month.

**5.** Now the alerts, which are the important part. Under `Configure alerts`
create **three**, one per row of this table. In all three, the threshold type is
`Percentage` and the condition is `Greater than`.

| Alert | Threshold | Equivalent to | What it is for |
|---|---|---|---|
| First | `10` % | 1 USD | Finding out that something started charging |
| Second | `50` % | 5 USD | Telling you something has been running for days |
| Third | `100` % | 10 USD | Final safety net |

In each one, write your address under `Email recipients`.

**6.** Review the summary and click `Create budget`.

*You should see:* the budget in the list, with your current spend and the three
alerts configured.

## ▶️ Check it works

Open `Budgets` and look at the `redes-aws-presupuesto` row. It has to show:

```text
   Budget name              redes-aws-presupuesto
   Budgeted amount          $10.00
   Current spend            $0.00  (or whatever you are at)
   Alerts                   3
```

Open the budget and go to the alerts tab. The three thresholds have to be
there, at 10 %, 50 %, and 100 %, each one with your address.

If your account already had earlier spend, the `Current spend` number will not
be zero. That is fine: what matters is that the three alerts are in place.

An honest warning: **you will not be able to prove the email arrives** until you
really spend. AWS has no test button. The first time it writes to you will be in
module 2, with the first resource that charges.

That is why it is worth doing a check you can do today. Look at the address you
entered and ask yourself two things. Is it an address you actually read? And
would it pass the spam filter, or would it land in a folder you never open? A
warning nobody reads is the same as having no warning.

## 🧯 If something breaks

**You cannot find `Billing and Cost Management`, or you open it and see
nothing.**
Cause: you are using a user that has no permission to view billing. Only the
root user and whoever has billing permissions can see it.
Fix: sign in with the account's root user, or ask to be given billing access.

**The budget shows up as created but the spend stays blank.**
Cause: billing data takes up to 24 hours to refresh.
Fix: wait. It is not a fault. And it is exactly the reason for putting the first
alert at 10 %. By the time it reaches you, you will have been spending for a
while.

**It will not let you add three alerts.**
Cause: you skipped the `Add alert threshold` step between one and the next.
Fix: on the alerts screen, each alert is added separately. Create the first one,
save it, and repeat.

## 🧹 What stays running

**What you created:** a budget with three email alerts.

**What gets deleted now:** nothing.

**What stays alive:**

| Resource | Cost while it lives | Deleted in |
|---|---|---|
| `redes-aws-presupuesto` | Free. The first two budgets of an account are not charged | lesson 8.6, and only if you want to |

This is the one resource in the course I recommend you **do not delete at the
end**. It is free, it stays out of the way, and it will keep warning you when
this course is a memory. Lesson 8.6 reminds you and lets you decide.

**Check nothing extra was left behind:** under `Budgets`, there has to be
exactly one with the course's name.

## 🔁 Check yourself

1. What does AWS Budgets do when you cross the threshold, and what does it not
   do?
2. Why are a budget and a single alert at 100 % not enough?
3. Which percentage threshold equals 1 dollar in a budget of 10?
4. Why can the spend take a while to appear?

**Answers:** One, it sends you an email. It does not shut anything down or block
the account, and the spending keeps running. Two, because it would warn you once
you have already spent the 10. The useful alert is the first, the one that fires
early. Three, 10 %. Four, because AWS billing data takes up to 24 hours to
refresh.

## 🎒 Something to think about

The budget you just set is monthly. Imagine you create something on the 28th
and forget about it. When would the first threshold warn you, and what happens
when the month rolls over and the counter resets? Think about whether that
protects you or throws you off.
