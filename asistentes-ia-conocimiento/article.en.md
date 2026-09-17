> **Starting point:** “That’s explained somewhere.”

Think of a time you heard that sentence. Perhaps the answer sat on a service page, in a shared document, or in an email nobody could find.

The information existed. Reaching it was the hard part.

Now imagine someone could ask in their own words and receive an explanation together with the document that supports it.

That is one of the uses of RAG: connecting answer generation with the retrieval of relevant information.

## The problem is not always a lack of information

Imagine a company with a website, several service guides and internal documentation.

A visitor wants to know what they need to prepare before starting a project. At the same time, someone who has just joined the team is looking for the procedure to handle a request.

They are different needs with a shared design goal: **bring each person the information that belongs to them, without forcing them to know where it is stored**.

For the visitor, think of help that orients them through public content. For the team, a tool that consults authorised internal documentation.

Those would be experiences with different scope and permissions.

Do not assume everything needs a conversation. Before you build an assistant, check whether a clearer page or a well-solved search would be enough.

## RAG in one simple idea

RAG stands for *Retrieval-Augmented Generation*.

Before writing an answer, the system searches for relevant information in the sources prepared for that query. Then it adds those fragments to the context the model works with.

Think of it as an answer “with the manual open”, rather than one based only on the model’s general knowledge.

That does not mean the assistant has permanently learned every document. Looking information up and retraining a model are different mechanisms.

For example, asked what a service includes, we could design the assistant to find the approved description and write an explanation based on it.

The aim would be that it does not invent terms the company has never defined.

![A question triggers a search in selected documents and produces a backed answer](rag-tres-pasos.webp "RAG in three steps: ask, retrieve, answer")

Answering with documentation is not the same as always answering well. RAG can reduce the risk of invented answers, but it does not remove errors.

Documentation supplies context; checking is still required.

## What an assistant on your website would look like

Someone arrives on a digital-services website and asks: “Can we improve how we handle enquiries without rebuilding the whole website?”

In this example, the assistant would first search published information about integrations and processes. It should only answer about possibilities those sources support.

If the documentation could not determine compatibility with that visitor’s specific website, it should say so. It should not turn a general possibility into a promise about that project.

From there, a handoff to the team could make sense: prepare a summary of the enquiry and offer the person to send it through the contact channel. Collecting and sending data should be visible and under their control.

The aim is a better-prepared conversation, not constant pressure to fill in a form.

The same exercise could sit inside the company. For example, an internal assistant that helps locate an onboarding guide or the procedure for a task, always within authorised access.

The question is what this person needs to understand in order to move forward.

## Trust is designed from the start

Before you think about how the assistant looks, settle three questions.

### Work with current information

Select approved documents and assign someone responsible for keeping them current. Also define how the information the system consults is updated when a page or a procedure changes.

Updating sources and bringing them into the system is part of how RAG works. Do not assume every external change will appear in the answers at once.

### Show what the answer rests on

RAG systems can include references to the content they consulted, so someone can check where an explanation came from.

Those references should lead to the relevant fragment. Also check that the fragment actually supports the claim: showing a link should not replace reviewing the answer.

When there is not enough information, “I cannot confirm this from this documentation” is better than an invented explanation.

### Separate access

Public and internal documentation need different access controls. In a RAG application, those permissions must apply to document retrieval according to the authorised identity. An instruction telling the assistant not to reveal information is not enough.

A prudent starting point for a public version is to limit sources to content approved for the website.

![Two separate knowledge spaces protect public information and internal documentation](accesos-publico-interno.webp "Different access for public and internal knowledge")

## Where to start without trying to cover everything

Start with a family of questions: what a service includes, how to prepare a request, or where to find a specific guide.

Then select the sources that should be able to answer them. Use that step to find gaps: reasonable questions that still have no approved answer.

Include in the trial clear questions, ambiguous wording, and queries the system should not answer. Also check what happens when someone tries to reach content outside its scope.

Measure whether the answer is correct, whether it rests on the right sources, and whether it helps resolve the doubt. When a person has to take over, check whether the context arrives complete.

Do not measure success by avoiding all human contact. In some enquiries, handing the conversation to the team would be the best result.

## Close

Before asking AI to know more, decide what information it should be able to find and share. A concrete family of questions and a set of approved sources are enough to start.
