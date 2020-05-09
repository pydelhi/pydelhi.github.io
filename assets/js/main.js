function display_next_event(el) {
    // Display the next event available on meetup.com in the given html element.
    //
    // Usages:
    // Add the following html markup in you page where you want the event to show
    // <div class="section--next_event" data-meetup-url="<name-of-meetup-group-here>"></div>
    //
    // Call this function after the page has loaded.
    // <script> display_next_event('.section--next_event')</script>

      var  meetup_group = $(el).attr('data-meetup-group'),
           meetup_cta_url = $(el).attr('data-cta-url'),
           meetup_cta_text = $(el).attr('data-cta-text');

    var timeConverter = function(UNIX_timestamp){
      var a = new Date(UNIX_timestamp);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var time = date + ' ' + month + ' ' + year;
      return time;
    }

    $.ajax({
      url: 'https://api.meetup.com/'+meetup_group+'?photo-host=public&sig_id=44948372&only=next_event&sig=03b1cf02afd70a3ae78cc9c8cc83d514d6f37ecf',
      jsonp: 'callback',
      dataType: 'jsonp',
      success: function( response ) {
          var next_event = response.data.next_event;
          // display only when there is an event.
          if (next_event){
            var event_title = next_event.name + ' (' + timeConverter(next_event.time) + ')';
            var event_url = 'http://www.meetup.com/'+meetup_group+'/events/' + next_event.id;
            var html = '<a target="_blank" href=' + event_url + '>' + event_title + '</a>';
            html += '<a class="btn-cta" href="'+ meetup_cta_url +'" target="_blank">' + meetup_cta_text + '</a>'
            $(el).html(html);
          };
      }
    });
}

function display_blog_posts(el) {
  // Displays the latest blog posts on pydelhi.org/blog
  // displays a short summary along with the post title and author
  // the number of posts to show and the length of truncated description
  // can be controlled through the below variables

    var $el = $(el);
    var FEED_URL = $el.attr('data-feed-url');
    var MAX_LATEST_POSTS = $el.attr('data-max-items');

    var domBlogList = $('<ul />', {"class": "blog-post__list"});

    $.get(FEED_URL, function (data) {
        // restrict latest posts to the above constant
        $(data).find("item").slice(0, MAX_LATEST_POSTS).each(function () {
            var item = $(this);
            var title = item.find("title").text();
            var author = item.find("dc\\:creator").text();
            var link = item.find("link").text();

            var domBlogPostItem = $("<li class='blog-post__item'></li");

            var domTitle = $("<a/>", {
                "class": 'blog-post__title',
                "href": link,
                "text": title
            });

            var domAuthor = $("<div/>", {
                "class": 'blog-post__author',
                "text": "By " + author
            });

            domBlogPostItem.append(domTitle).append(domAuthor);
            domBlogList.append(domBlogPostItem);
        });

        // add or replace the element.
        var node = $el.find('.blog-post__list');
        if(node.length){
          node.replaceWith(domBlogList);
        }else {
          $el.append(domBlogList);
        }
    });
}

function display_sponsors(el) {
    // Displays the sponsors of pydelhi meetup group
  
    var $el = $(el);
    var domSponsorList = $('<ul />', {"class": "sponsor__list"});

    // meetup api requires all these fields in order for sig and sig_id to match
    // this sig_id is valid for only this type of request
    // i.e. getting the sponsors list for pydelhi meetup group
    var requestParams = {
        'offset': 0,
        'format': 'json',
        'group_urlname': 'pydelhi',
        'only': 'sponsors',
        'photo-host': 'public',
        'page': 500,
        'radius': '25.0',
        'fields': 'sponsors',
        'order': 'id',
        'desc': 'false',
        'sig_id': '203199327',
        'sig': '772c5fcaa8c986cdfb75ada45f97c297f76e5cf6'
    };

    $.ajax({
        url: 'https://api.meetup.com/2/groups?' + $.param(requestParams),
        jsonp: 'callback',
        dataType: 'jsonp',
        success: function(response) {
            var sponsors = response.results[0].sponsors;
            
            sponsors.forEach(function (sponsor) {
                var title = sponsor.name;
                var img_url = sponsor.image_url;
                var link = sponsor.url;

                var domSponsorItem = $("<li class='sponsor__item'></li");

                var domImg = $("<img/>", {
                    "class": 'sponsor__img',
                    "src": img_url
                });

                var domLinkWrapper = $("<p/>", {
                    "class": 'sponsor__title',
                });

                var domLink = $("<a/>", {
                    "href": link,
                    "text": title
                })

                domLinkWrapper.append(domLink);
                domSponsorItem.append(domImg).append(domLinkWrapper);
                domSponsorList.append(domSponsorItem);
            });

            // add or replace the element.
            var node = $el.find('.sponsor__list');
            if(node.length){
              node.replaceWith(domSponsorList);
            }else {
              $el.append(domSponsorList);
            }
        }
    });

}
