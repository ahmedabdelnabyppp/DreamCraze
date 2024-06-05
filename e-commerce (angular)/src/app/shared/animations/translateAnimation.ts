import { trigger, transition, style, animate, state } from '@angular/animations';

export const translateAnimation = trigger('translateAnimation', [
    state('Entry', style({ opacity: 1, transform: 'translateX(0)' })),
    state('leave', style({ opacity: 0, transform: 'translateX(150%)' })),
    transition('leave => Entry', [
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
    ]),
    transition('Entry => leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(150%)' }))
    ])
]);

