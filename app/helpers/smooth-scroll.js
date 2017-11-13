import Ember from 'ember';

const { $ } = Ember;

//
// A helper to add smooth scrolling to an anchor the points to an element on the
// page. Usage:
//
// <a href="#something" onclick={{smooth-scroll}}>Scroll to #something</a>
//
export function smoothScroll() {
  return (e) => {
    let href = e.target.getAttribute('href');

    if (href[0] === '#') {
      let $target = $(href);
      if ($target.length > 0) {
        e.preventDefault();

        $('html, body').animate({
          scrollTop: ($target.offset().top - 48)
        }, 1000, "easeInOutExpo");
      }
    }
  };
}

export default Ember.Helper.helper(smoothScroll);
