> **Starting point:** sending the most capable model to every task is like asking the senior to sort the inbox.

## The senior doing the junior’s work

Picture this: a commercial proposal, an internal report or a reply to a client. Someone opens an AI tool, picks the most powerful model at hand and asks it to do everything: search, summarise, draft, correct and decide whether the result can go out.

Nothing especially unusual. In many companies it happens several times a day.

The problem is not using AI. The problem is treating every assignment as if it asked for the same kind of intelligence.

In a human team you would not ask the same person to write the first draft, find the data, pass the quality filter and sign the decision. Some work asks for judgement. Some work asks for volume. Mixing them in a single head is expensive, even when that head is very good.

The same thing happens with AI models.

Before asking which tool to buy, there is another question:

Which part of this task needs a senior, and which part can a well-directed junior do well?

## What an agent is, and what changes when there are several

An AI model, on its own, answers an instruction. An **agent** can chain steps: read a context, use tools, ask another model for help and return a result. Not every task needs an agent. A one-off summary or a simple classification often works with a well-written instruction.

The difference appears when the work has several parts. For example: gather information, draft a first text, check that no fact has been invented, and leave it ready for human review.

That is where **orchestration** comes in: a lead agent splits the work, waits for results and decides what is accepted, what is redone and what is escalated to a person.

It is the equivalent of a team lead. It does not write every paragraph. It decides who does what, with what margin, and when the result is ready to leave.

![An orchestrator agent distributes three tasks and gathers their results for review](agente-orquestador.webp "An orchestrator coordinates tasks, results and review")

That design is not improvised by opening a chat. You have to define what each agent can do, which tools it is allowed to use, and at which point a person steps in.

## Two kinds of model, two kinds of employee

The tools your team already uses mix models of different capability and different cost. The temptation is always to leave the most powerful one on. The other temptation is to go to the cheapest and expect the same result.

Neither works.

### The senior: judgement, planning and review

Higher-capability models fit better when the task asks you to understand a problem, split it into parts, catch a structural error or decide whether a result is ready. They are the equivalent of a senior: they usually cost more, and they contribute more when the work is not mechanical.

It makes sense to reserve them for:

- defining the plan for a complex task
- reviewing other agents’ work
- resolving exceptions, ambiguities or decisions with commercial impact
- checking coherence, tone and risk before something leaves the team

It makes less sense to use them to rename files, extract a table, or produce the fifth draft of a standard email.

### The junior: volume, speed and a first result

Fast, efficient models cover another part of the work. They do not replace judgement. They handle repetitive tasks at lower cost when the goal, the format and the limits are well defined.

They fit better in:

- first drafts
- summaries of material already available
- classifying requests
- searches and format transformations
- concrete pieces inside a plan the senior has already set

A well-directed junior saves time. A junior without a clear assignment multiplies corrections. The cheaper models do exactly that.

![A planning module directs three execution modules and reviews their results](criterio-y-ejecucion.webp "Judgement to direct; capacity to execute")

The analogy is not an intelligence ranking. It is an allocation rule: **reserve the highest capability for planning and review; use efficient models to execute bounded tasks under supervision**.

## How the work is split, in practice

Let us put the ideas together in a hypothetical example, not a client case.

The commercial team needs a proposal from a meeting, some emails and a service sheet. Today, one person does almost everything. Or they ask a single large model to “do it all”.

A simple orchestration could work like this:

**The senior defines the assignment.** A higher-capability model reads the goal, identifies what information exists, what is missing and what the deliverable should look like. It does not write the full proposal yet.

**The juniors execute pieces.** A cheaper model summarises the meeting. Another sorts the emails. Another prepares a first draft of each section from the service sheet, without inventing terms that are not in the material.

**The senior comes back in.** It checks whether the pieces fit, whether the tone is right and whether there are gaps. If something is not up to standard, it sends it back. If the result is ready for human eyes, it hands it to the person responsible.

**A person closes.** Terms, timelines and commitments are signed by the team, not by the system.

The saving appears in the expensive model’s hours and in the person’s hours. The large model has not written ten pages that then have to be redone. It has directed. The cheaper models have produced material that can be reviewed. The person has not started from zero.

That split looks simple when described in four steps. In real work the difficulty sits elsewhere: knowing which task deserves a senior, which instruction a junior needs so it does not drift, and when to stop the automation. That is where a team without judgement ends up using the same model every time, or finishing every assignment by hand.

![A plan is split into pieces, assembled as a proposal, and receives human approval](flujo-propuesta-comercial.webp "A commercial proposal orchestrated from start to finish")

## What it costs to use AI badly

The cost of AI in a company is not only the usage bill. It is also the time of the person who reviews, corrects and asks for the work again.

Three patterns show up often:

**Everything to the most expensive model.** Every email, every summary and every search goes through a high-capability model. The result can be correct and still pay senior judgement for junior work.

**Everything to the cheapest model.** The team saves on usage and loses it in corrections, rewrites and bad decisions. A junior without supervision is not a saving. It is half-finished work.

**Everyone improvises.** One employee always uses the most powerful model. A colleague uses the fastest. Nobody reviews the same way. Cost becomes unpredictable, and quality does too.

From a business point of view, these would be four checks:

| What to watch | What to check |
| --- | --- |
| Use of the expensive model | What share of tasks actually needed judgement, planning or review. |
| Rework | Times a person has to redo the result before they can use it. |
| Team time | Minutes spent directing the AI, not only copying the answer. |
| Total cost | Model usage, human supervision and the training needed to do it well. |

A fast answer that forces the work to be redone misses the goal. A cheap model that produces volume without control misses it too.

## Judgement does not arrive with the tool

Giving people access to several models does not turn them into people who know how to orchestrate them. In the same way, giving someone a junior team does not turn them into a good lead.

People need to know, in their concrete work:

- when a fast model is enough and when the assignment has to be stepped up
- how to frame a task so a junior agent does not fill gaps with assumptions
- what can be automated and what a person must review
- how to chain tools without turning every day into an experiment

That is not solved with a generic manual or a list of models. It is solved by training the team on their real flow: proposals, enquiries, internal documents, reviews. Which part an agent can do and which part it cannot.

You do not need to start with a complex system. You need someone on the team who knows how to direct the work, the way they would direct people.

![An operating playbook feeds a cycle of practice, review and improvement](formacion-equipo.webp "Training applied to the team’s real flow")

## Close

If the answer to “who chooses the model” is “whichever one each person has open that morning”, cost is already deciding itself. Start with a task that always goes to the same model today, and decide which part asks for judgement and which part asks for volume.
