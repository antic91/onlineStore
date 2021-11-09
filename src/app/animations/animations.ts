import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, state
} from '@angular/animations';

/****************ROTATE ANIMATION*******************************/
export const rotateAnimation = {
  animeTrigger: trigger('rotatedState', [
          state('default', style({ transform: 'rotate(0) translateX(0px);' })),
          state('rotated', style({ transform: 'rotate(45deg)' })),
          transition('rotated => default', animate('400ms ease-out')),
          transition('default => rotated', animate('400ms ease-in'))
    ])
}
export const rotateAnimationSec = {
  animeTrigger: trigger('rotatedStateSec', [
          state('default', style({ transform: 'rotate(0)' })),
          state('rotated', style({ transform: 'rotate(-45deg)' })),
          transition('rotated => default', animate('400ms ease-out')),
          transition('default => rotated', animate('400ms ease-in'))
    ])
}


/****************Fade in ANIMATION*******************************/
export const fadeIn = animation([
  style({ opacity: '{{opacity1}}' }),
  animate('{{time}}', style({opacity: '{{opacity2}}'}))
])



/**************************SLIDE IN ANIMATION********************************** */
export const slideAnim = animation([
  style({  opacity: '{{opacity1}}', transform: '{{translateValue}}({{translate1}},{{translate2}},{{translate3}})' }),
  animate('{{time}}', style({ opacity:'{{opacity2}}', transform: '{{translateValue1}}({{translate4}},{{translate5}},{{translate6}})'}))
]);
