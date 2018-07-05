(function($) {
    $.fn.emc = function() {

        // var defaults = {
        //         scoring: "normal",
        //         progress: true
        //     },
            // settings = $.extend(defaults,options),
        var $quizItems = $('[data-quiz-item]'),
            $row1 = $('.row1'),
            $row2 = $('.row2'),
            $row3 = $('.row3'),
            $choices = $('[data-choices]'),
            itemCount = $quizItems.length,
            chosen = [],
            chosenA = [],
            chosenB = [],
            chosenC = [],
            chosenD = [],
            $option = null,
            $label = null;

        emcInit();

        // if (settings.progress) {
        //     var $bar = $('#emc-progress'),
        //         $inner = $('<div id="emc-progress_inner"></div>'),
        //         $perc = $('<span id="emc-progress_ind">0/'+itemCount+'</span>');
        //     $bar.append($inner).prepend($perc);
        // }

        function emcInit() {
            $quizItems.each( function(index) {
                var $this = $(this),
                    $choiceEl = $this.find('.choices'),
                    choices = $choiceEl.data('choices'),
                    type = $choiceEl.data('type');
                for (var i = 0; i < choices.length; i++) {
                    $option = $('<input name="'+index+'" id="'+index+'_'+i+'" type="radio">');
                    $label = $('<label for="'+index+'_'+i+'">'+choices[i]+'</label>');
                    $choiceEl.append($option).append($label);

                    $option.on( 'change', function() {
                        return getChosen();
                    });
                }
            });
            $row2.hide();
            $row3.hide();
            alert();
            gotoStep();
        }

        function alert() {
            var $warning = $('#warning');
            $('#emc-submit, .next').click(function () {
                if($(this).hasClass('ready-show'))
                    return;
                // alert('not yet!!')
                $warning.fadeIn('fast');
            });
            $('.confirm').click(function () {
                $warning.hide();
            })
        }

        function gotoStep() {
            $('button').click(function () {
                var $id = $(this).attr('id');

                if($id === undefined || $id === 'emc-submit' || $id === '')
                    return;

                var $direction = $id.slice(0, 4),
                    $page = $id.slice(4, 5),
                    $nextPage = (Number($page)+1);

                if($direction == 'next' && $(this).hasClass('ready-show')) {
                    $('.row'+ $page).hide();
                    $('.row'+ $nextPage).show();
                    $('#step'+ $nextPage).addClass('active').siblings().removeClass('active');
                }else {
                    $('.row'+ $nextPage).hide();
                    $('.row'+ $page).show();
                    $('#step'+ $page).addClass('active').siblings().removeClass('active');
                }
                $('html,body').animate({scrollTop: 0}, 50);
            });
        }

        function getChosen() {
            chosen = [];
            chosenA = [];
            chosenB = [];
            chosenC = [];
            chosenD = [];

            $choices.each( function() {
                var $type = $(this).attr('data-type');
                var $inputs = $(this).find('input[type="radio"]');
                var $score = $(this).find('input[type="radio"]').eq(0);

                $inputs.each( function(index) {
                    if($(this).is(':checked')) {
                        chosen.push(index);
                    }
                });

                $score.each( function(index) {
                    if($(this).is(':checked')) {
                        switch ($type) {
                            case 'A':
                                chosenA.push(index);
                                break;
                            case 'B':
                                chosenB.push(index);
                                break;
                            case 'C':
                                chosenC.push(index);
                                break;
                            case 'D':
                                chosenD.push(index);
                        }
                    }
                });
            });

            console.log('A='+ chosenA.length);
            console.log('B='+ chosenB.length);
            console.log('C='+ chosenC.length);
            console.log('D='+ chosenD.length);
            console.log('==================');
            getProgress();
        }

        function getProgress() {
            // var prog = (chosen.length / itemCount) * 100 + "%",

            var $next1 = $('#next1'),
                $next2 = $('#next2'),
                $submit = $('#emc-submit');

            // if (settings.progress) {
            //     $perc.text(chosen.length+'/'+itemCount);
            //     $inner.css({height: prog});
            // }


            if (chosen.length === 5) {
                $next1.addClass('ready-show');
            }
            if (chosen.length === 23) {
                $next2.addClass('ready-show');
            }
            if (chosen.length === itemCount) {
                $submit.addClass('ready-show');
                $submit.click( function(){
                    return scoreCalc();
                });
            }
        }

        function scoreCalc() {
            var scoreA = chosenA.length,
                scoreB = chosenB.length,
                scoreC = chosenC.length,
                scoreD = chosenD.length;

            var chkFat = false;

            var needRadio = $row1.find('.choices').find('input[type="radio"]');

            if(needRadio.eq(0).is(':checked')||needRadio.eq(2).is(':checked')||needRadio.eq(4).is(':checked')||needRadio.eq(6).is(':checked')||needRadio.eq(8).is(':checked')){
                chkFat = true;
            }

            var win = Math.max(scoreA, scoreB, scoreC, scoreD);

            var scoreAll = scoreA + scoreB + scoreC + scoreD;

            if(scoreAll < 3 && chkFat === false) {
                console.log('not fat');
                window.location.href = '../Quiz/typeN.html';
            }else if(win === scoreA) {
                console.log('A type fat');
                window.location.href = '../Quiz/typeA.html';
            }else if(win === scoreB) {
                console.log('B type fat');
                window.location.href = '../Quiz/typeB.html';
            }else if(win === scoreD) {
                console.log('D type fat');
                window.location.href = '../Quiz/typeD.html';
            }else if(win === scoreC) {
                console.log('C type fat');
                window.location.href = '../Quiz/typeC.html';
            }
        }

    }
}(jQuery));


$(document).emc();