> **Starting point:** pick a concrete task before asking whether AI belongs on the website.

## A repeating task is a concrete opportunity

Picture this: someone lands on your website, looks at a service and sends a question. Someone on the team reads the message, looks up information, asks for a missing detail and drafts a reply. Then they log the conversation and ping a colleague.

Nothing especially complicated. But what happens when that sequence repeats several times a day?

Before asking whether AI belongs on the website, there is another question:

Which part of this path needs human judgement, and which part could we simplify?

You may not need to change the whole website. The first step can be to prepare requests better before they reach the team, or to help someone find the right information without walking through five pages.

The starting point is to choose one concrete need.

## Three AI ideas, without the jargon pile-up

### Generative AI: preparing a first result

Generative AI can produce content from instructions and the context it receives. In a text application, that allows tasks such as drafting a reply or summarising information. The result still needs checking. It is a first piece of content, not a correct answer by definition.

Take a long request sent from the website. One use would be to prepare a summary of what the person needs, the data they provided and the questions still open.

That task is steered with a **prompt**: the instruction the model receives. Specifying the goal, the context and the expected format helps guide the response.

For example:

> Summarise this request for the team. Separate the main need, the data provided and the information that is missing. Do not fill the gaps with assumptions.

The business aim would be that whoever handles the case starts with ordered information, without losing access to the original message.

### RAG: look up company information before answering

RAG is the technical name for a fairly intuitive approach: **retrieve relevant information from selected sources and use it to prepare the answer**. Those sources can be service pages, FAQs or authorised documentation. It is not the same as retraining the model every time a document is added.

It is closer to checking a manual before explaining how something works.

On a website, one use would be answering a question about the scope of a service from its published description, with a reference the reader can check.

That does not remove errors: sources can be out of date, retrieval can bring back too little, and the model can still be wrong. So it is worth deciding what to do when there is no backed answer.

Sometimes the best response is to ask for a clarification or hand over to a person.

![A query selects relevant documentation and produces an answer tied to its sources](rag-fuentes-respuesta.webp "RAG: answering with the sources open")

### Flows and agents: from answering to doing work

An automated flow follows a defined path. An AI agent can choose which steps and tools to use within the limits you set. Not every automation needs an agent, and not every task needs the same degree of autonomy.

For example, classifying a request and sending it to a specific queue could be a simple flow. A task that has to consult several sources and decide what information is missing could justify a more flexible design.

You still have to decide what the system is allowed to do in that process.

## From a visit to a well-aimed task

Let us put the ideas together in a hypothetical example, not a client case.

Someone writes on the website:

> We want to improve how we handle enquiries. They arrive through different channels and we struggle to follow up.

An experience designed around that need could work like this:

**First, clarify the request.** The assistant would ask which channels they use and where follow-up gets stuck, without turning the conversation into an interrogation.

**Then, bring in relevant information.** It would consult authorised content and show what actually fits the question, without inventing features, prices or timelines.

**Next, prepare the context.** With the necessary data, it would write a summary for the team and flag the open questions.

**Finally, give continuity.** If the right integration existed, it could log the request in the CRM or prepare an internal task. Actions that need approval would wait for review.

That last step would not happen just because you added an AI model. You would still have to connect the tools, set permissions and define the path.

The aim would be that the conversation leaves a clear next step for the person and for the team.

![An enquiry is clarified and organised before human approval](consulta-a-tarea.webp "From an enquiry to a prepared, reviewed task")

## Automate with judgement

Before launching a solution like this, define what information it can consult, which actions it is allowed to take, and when a person must step in. It should also be clear to the visitor that they are interacting with AI. These are design decisions. Take them before launch.

For the example above, we would set concrete limits: do not confirm commercial terms, do not access documentation unrelated to the enquiry, and do not execute sensitive actions without the matching approval.

We would also prepare a simple exit to the human team. A conversation that needs personal attention should not get stuck in an automatic exchange.

AI can handle one part well and hand over the rest with enough context.

## Start with an improvement you can measure

For a first trial, we would choose a frequent, bounded task that is easy to review. For example, preparing a summary of requests that arrive from the website, before adding public answers or extra actions.

The proposal would be to compare the current process with the new one using representative cases, including incomplete or ambiguous requests. The evaluation should check the quality of the answers and whether they match the available information, not only whether they read well.

From a business point of view, these would be four checks:

| What to watch | What to check |
| --- | --- |
| Team time | Minutes spent per case, including review and corrections. |
| Quality | Correct, complete results in a sample reviewed by people. |
| Continuity | Requests that reach the next step with the information needed. |
| Total cost | Implementation, usage, maintenance and supervision of the system. |

A fast answer that forces the work to be redone would miss the goal. A trial that saves time but loses important information would miss it too.

## Close

The first project has to support an informed decision about the next one. Pick a repeating task, measure time and quality, and decide with data whether the next step is worth it.
