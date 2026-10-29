---
layout: layouts/page.njk
title: Speak at PyDelhi
description: Propose a talk, lightning talk, workshop or Birds of a Feather session at a PyDelhi meetup. First-time speakers welcome; proposals are reviewed in the open on GitHub.
permalink: /speak/
heading: Host a session at <em>PyDelhi.</em>
lede: First-time speakers, students and seasoned engineers all share the same stage. If it's about Python and you're excited about it, we want to hear it. A rough idea is enough to start.
actions:
  - { label: "Propose a session", url: "https://github.com/pydelhi/talks/issues/new?template=talk-proposal.yaml", icon: "arrow-up-right" }
  - { label: "Read the speaker guidelines", url: "https://github.com/pydelhi/talks/blob/main/guidelines/speaking.md", class: "btn-line" }
---

{% section "Every talk, <em>in the open.</em>", "Proposals are GitHub issues, so you can watch yours move from idea to stage. Here is the path every talk takes.", "board" %}
{% include "proposal-board.njk" %}
{% endsection %}

{% section "Pick the format that fits.", "Four ways to host a session, from five minutes on stage to an open circle. Not sure which? Say so in the proposal and the reviewers will help you choose." %}
{% include "pick-format.njk" %}
{% endsection %}

{% section "What reviewers look for." %}
{% checklist %}
- **It's about Python.** Libraries, internals, tooling, testing, data, the web, or the side project that got out of hand.
- **It works for beginners.** Most of the room is new to Python. Advanced topics are welcome if you explain them accessibly and state any prerequisites.
- **It fits a slot.** A 5-minute lightning talk, or a 20 to 30 minute talk with time for questions. Workshops and Birds of a Feather sessions run longer, so say so in the proposal.
- **It's still taking shape, and that's fine.** Submit early. The sooner it's in, the more time there is for feedback.
- **It has a fresh angle on hot topics.** GenAI, LLMs, RAG and agents get lots of proposals, so bring a new use case, a deep dive into internals, or lessons from production.
- **It's accessible to everyone.** Readable slides and clear audio, following our [accessibility guidelines]({{ site.accessibilityGuidelines }}). Content matters more than polish or perfect English.
{% endchecklist %}
{% buttons %}
{% button "How we review proposals", site.reviewingGuidelines, "arrow-up-right" %}
{% button "Previously accepted talks", "https://github.com/pydelhi/talks/issues?q=is%3Aissue+state%3Aclosed+label%3Aaccepted", "arrow-up-right", "line" %}
{% endbuttons %}
{% endsection %}

{% section %}
{% panel "green", "Licence and recording.", "Talks given at PyDelhi are shared under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 licence unless you say otherwise, and many are recorded for our YouTube channel." %}
{% buttons %}
{% button "Propose a session", site.proposeTalk %}
{% button "Watch on YouTube", site.youtube, "youtube-logo", "line" %}
{% endbuttons %}
{% endpanel %}
{% endsection %}
