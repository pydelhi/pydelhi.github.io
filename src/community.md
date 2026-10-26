---
layout: layouts/page.njk
title: Community | PyDelhi
description: Where to find PyDelhi between meetups, on WhatsApp, Telegram, the mailing list, Commudle, GitHub, YouTube, LinkedIn and X.
permalink: /community/
heading: Find us <em>between meetups.</em>
lede: The meetup is one Saturday a month. The conversation carries on every day, in chats, on the mailing list and in the open on GitHub.
join: true
---

{% section "Pick your <em>channel.</em>", "Every meetup starts on Commudle. Everything in between happens here." %}
{% include "channel-bento.njk" %}
{% endsection %}

{% section "Friends of PyDelhi.", "Communities we've co-hosted meetups with. If you run one too, let's do something together." %}
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
{% panel "green", "One rule for every channel.", "Our Code of Conduct applies in every chat and on every list, not just at meetups. Be friendly, be patient, and if someone asks you to stop, stop." %}
{% buttons %}
{% button "Read the Code of Conduct", "/coc/" %}
{% endbuttons %}
{% endpanel %}
{% endsection %}
