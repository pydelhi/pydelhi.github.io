---
layout: layouts/page.njk
title: Speak at PyDelhi
description: Propose a talk, lightning talk or workshop at a PyDelhi meetup. First-time speakers welcome; proposals are reviewed in the open on GitHub.
permalink: /speak/
heading: Give a talk at <em>PyDelhi.</em>
lede: First-time speakers, students and seasoned engineers all share the same stage. If it's about Python and you're excited about it, we want to hear it. A rough idea is enough to start.
actions:
  - { label: "Propose a talk", url: "https://github.com/pydelhi/talks/issues/new?template=talk-proposal.yaml", icon: "arrow-up-right" }
  - { label: "Read the speaker guidelines", url: "https://github.com/pydelhi/talks/blob/main/guidelines/speaking.md", class: "btn-line" }
---

{% section %}
{% panel "blue", "Got five minutes? <em>Or ninety?</em>", "Pick the length that fits your idea. Full talks are 20 minutes plus 5 for questions." %}
{% include "ruler.njk" %}
{% endpanel %}
{% endsection %}

{% section "From idea to <em>stage.</em>", "Proposals are open GitHub issues, so you can see where yours is at any time." %}
{% steps %}
{% step "Open a proposal" %}
Fill in the [talk proposal form]({{ site.proposeTalk }}) on GitHub. An outline is fine; slides can come later.
{% endstep %}
{% step "Get feedback" %}
Volunteer reviewers read every proposal and reply on the issue, often with suggestions to sharpen it.
{% endstep %}
{% step "Share a draft" %}
Before we lock in a date we need a draft of your slides or demo, checked against our [accessibility guidelines]({{ site.accessibilityGuidelines }}).
{% endstep %}
{% step "Take the stage" %}
Meetups are on the third Saturday of the month. Talks may be recorded for our [YouTube channel]({{ site.youtube }}).
{% endstep %}
{% endsteps %}
{% endsection %}

{% section "What we look <em>for.</em>" %}
{% tiles %}
{% tile "file-py", "Something about Python" %}
Libraries, internals, tooling, testing, data, the web, or the side project that got out of hand. It just has to be Python-related.
{% endtile %}
{% tile "plant", "A room of beginners" %}
Most of the audience is new to Python. Advanced topics are welcome if you explain them accessibly, and state any prerequisites up front.
{% endtile %}
{% tile "lightbulb", "Ideas still in progress" %}
Submit early, even if the talk isn't finished. The earlier you send it, the more time there is for feedback.
{% endtile %}
{% tile "translate", "Content over polish" %}
Don't worry about public speaking or English fluency. We care about what you have to share, and we'll help you shape it.
{% endtile %}
{% tile "sparkle", "A fresh angle on hot topics" %}
GenAI, LLMs, RAG and agents get lots of proposals, so they need a little more: a new use case, a deep dive into internals, or lessons from production.
{% endtile %}
{% tile "hand-heart", "Respect for the room" %}
Every speaker follows our [Code of Conduct](/coc/). No derogatory or exclusionary language, in slides or on stage.
{% endtile %}
{% endtiles %}
{% endsection %}

{% section "Talks people have <em>given here.</em>", "Every talk since PyDelhi moved its proposals to GitHub, newest first.", "past-talks" %}
{% include "talk-list.njk" %}
{% buttons %}
{% button "All " + talks.length + " talks on GitHub", "https://github.com/pydelhi/talks/issues?q=label%3Adelivered", "arrow-up-right", "line" %}
{% button "Watch recordings on YouTube", site.youtube, "youtube-logo", "line" %}
{% endbuttons %}
{% endsection %}

{% section %}
{% panel "green", "Ready when <em>you are.</em>", "Talks delivered at PyDelhi are shared under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 licence, unless you say otherwise." %}
{% buttons %}
{% button "Propose a talk", site.proposeTalk %}
{% endbuttons %}
{% endpanel %}
{% endsection %}
