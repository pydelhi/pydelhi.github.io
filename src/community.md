---
layout: layouts/page.njk
title: Community | PyDelhi
description: Where to find PyDelhi between meetups, on WhatsApp, Telegram, the mailing list, Commudle, GitHub, YouTube, LinkedIn and X.
permalink: /community/
heading: Find us <em>between meetups.</em>
lede: The meetup is one Saturday a month. The conversation carries on every day, in chats, on the mailing list and in the open on GitHub.
join: true
---

{% section %}
{% tiles %}
{% tile "calendar-check", "Commudle", site.commudle, "RSVP for meetups" %}
Where every meetup is announced first. Join the community to get notified and save your seat.
{% endtile %}
{% tile "whatsapp-logo", "WhatsApp Community", site.whatsapp, "Announcements and chat" %}
The quickest way to hear about meetups, and to ask the room a question between them.
{% endtile %}
{% tile "telegram-logo", "Telegram", site.telegram, "Pythonistas in Delhi NCR" %}
Our long-running group chat for Python questions, links and help with whatever you're stuck on.
{% endtile %}
{% tile "envelope-simple", "Mailing list", site.mailingList, "ncr-python.in" %}
PyDelhi's oldest channel, running since the early days. Good for longer questions and job posts.
{% endtile %}
{% tile "github-logo", "GitHub", site.github, "Talks, proposals and code" %}
Propose a talk, review other people's proposals, or ask the organisers anything on the discussion forum.
{% endtile %}
{% tile "youtube-logo", "YouTube", site.youtube, "Talk recordings" %}
Recordings of talks from meetups and PyDelhi Conf, for when you missed a Saturday.
{% endtile %}
{% tile "linkedin-logo", "LinkedIn", site.linkedin, "News and recaps" %}
Meetup announcements, recaps and photos, plus the people behind them.
{% endtile %}
{% tile "x-logo", "X", site.x, "@pydelhi" %}
Announcements and live posts from meetups.
{% endtile %}
{% tile "article", "Blog", "/blog/", "Recaps" %}
What happened at past meetups and sprints, written up by people who were there.
{% endtile %}
{% endtiles %}
{% endsection %}

{% section "Friends of <em>PyDelhi.</em>", "Communities we've co-hosted meetups with. If you run one too, let's do something together." %}
{% chips %}
- PyData Delhi
- Django India
- Grafana and Friends Delhi
- ILUG-D
- TensorFlow User Group Ghaziabad
- BlockchainDevs
{% endchips %}
{% buttons %}
{% button "Propose a collaboration", site.discussions, "arrow-up-right", "line" %}
{% endbuttons %}
{% endsection %}

{% section %}
{% panel "green", "One rule for every <em>channel.</em>", "Our Code of Conduct applies in every chat and on every list, not just at meetups. Be friendly, be patient, and if someone asks you to stop, stop." %}
{% buttons %}
{% button "Read the Code of Conduct", "/coc/" %}
{% endbuttons %}
{% endpanel %}
{% endsection %}
