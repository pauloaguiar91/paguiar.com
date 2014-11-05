/*
 * PAULO AGUIAR - November 1, 2014
 * All code on this site with the exception of Bootstrap, jQuery, and Velocity.js was created by myself.
 * This is a SPA (Single Page Application) website, and makes use a lot of modern Javascript.
 */

(function() {
   function paguiar() {
       var $currentView = $('#indexContainer'),
           btnLock = false,
           userScrolling = false;

       function navClickHandler() {
           var $navIcon = $('nav').find('.close');

           if($navIcon.data("open")) {
               $navIcon.velocity({"rotateZ": "180deg"}).data("open", false);
               $('nav').velocity({"width": "50px", "onComplete": function() {
                   $('#mainContainer').velocity({"margin-left": "50px"});
               }}).find(".navLinks").hide(0);
           } else {
               $navIcon.velocity({"rotateZ": "0"}).data("open", true);
               $('#mainContainer').velocity({"margin-left": "20%", "onComplete": function() {
                   $('nav').velocity({"width": "20%"}).find(".navLinks").fadeIn();
               }});
            }
       }

       function openNewView(view, changeNav) {
           if(btnLock)
            return;

           btnLock = true;

           if(changeNav)
               navClickHandler();

           if(!userScrolling)
              $('html').velocity("scroll", { duration: 500 } );

           $currentView.fadeOut(function() {
               $currentView = $('#'+view+'Container');
               $currentView.fadeIn(function() {
                   btnLock = false;
               });
           });
       }

       function closeProject(project, event) {
           event.stopPropagation();

           project.find('.projectContent').slideUp(function() {
               $('#projectsContainer').find('.project').fadeIn();

               project.velocity({"width": "50%", "onComplete": function() {

               }});
           })

           $('#projectClose').remove();
       }

       function projectClickHandler(project) {
           $('#projectsContainer').find('.project').not(project).fadeOut(500);

           setTimeout(function() {
               project.append('<div id="projectClose" class="close glyphicon glyphicon-remove"></div>')
               $('#projectClose').on("click", function(e) { closeProject(project,e )});
               project.velocity({"width": "100%", "onComplete": function() {
                   project.find('.projectContent').delay(2000).slideDown(300);
               }});
           }, 1500)
       }

       /*
         * This function is just to set a flag if the user is scrolling or not.
        */
       function scrollEventHandler() {
           if(userScrolling)
              return;

           userScrolling = true;

           setTimeout(function() {
               userScrolling = false;
           }, 800);
       }

       function setupEvents() {
           $('nav').find('.close').on("click", navClickHandler);
           $('nav').find('span').on("click", function() { openNewView($(this).data("view"), true)});
           $('#goToProjects').on("click", function() { openNewView("projects", false)});
           $('#goToContact').on("click", function() { openNewView("contact", false)});
           $('#goToBlog').on("click", function() { openNewView("blog", false)});

           $('#projectsContainer').find('.project').on("click", function() { projectClickHandler($(this))});
           $(document).on("scroll", scrollEventHandler);
       }

       this.init = function() {
           setupEvents();
           $('nav').find('.close').data("open", true);
       };
   }


   var pa = new paguiar();
       pa.init();
})();