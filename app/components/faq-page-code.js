import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
      this._super(...arguments);

      // let $ = this.$.bind(this);
    },

    actions: {
     expand() {
       // this.incrementProperty(propName);
       alert("test");
     },
    }

  });

//
//   $(".faq-q").click( function () {
//     var container = $(this).parents(".faq-c");
//     var answer = container.find(".faq-a");
//     var trigger = container.find(".faq-t");
//
//     answer.slideToggle(200);
//
//     if (trigger.hasClass("faq-o")) {
//       trigger.removeClass("faq-o");
//     }
//     else {
//       trigger.addClass("faq-o");
//     }
// });
