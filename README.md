Ember Quizmaker
==========

This is a CMS for building Buzzfeed-style quizzes. It runs on Ember.js with Ember Data and uses the Yeoman Ember generator.
It's intended to make quizzes like these:
* Multiple choice-style: http://www.buzzfeed.com/justincarissimo/which-famous-emma-are-you
* Checklist-style: http://www.buzzfeed.com/leonoraepstein/how-bad-has-your-day-been
* Boolean-style: http://www.buzzfeed.com/justincarissimo/do-you-know-how-much-these-artists-are-worth

It's currently using HTML5 LocalStorage as a temporary data source, so all quiz data is stored in your local browser for now. The plan is to hook it up to a database with a JSON API to store the quizzes.

We'll probably just use an htaccess password prompt for the CMS authorization, and then use PHP to generate individual quiz pages outside of Ember. Those will be intentionally very bare-bones, because they'll be embedded in iframes on the client's website.