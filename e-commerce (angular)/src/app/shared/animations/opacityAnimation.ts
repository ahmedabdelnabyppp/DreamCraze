import { animate, style, transition, trigger } from "@angular/animations";

export const routingAnimation = trigger('routingAnimation', [
    transition('*<=>*', [style({ opacity: 0, transform: 'translateY(-10px)' }), animate('300ms', style({ opacity: 1, transform: 'translateY(0px)' }))]),
])

export const AnimationOpcity = trigger('AnimationOpcity', [
    transition('*<=>*', [style({ opacity: 0, transform: 'translateX(0px)' }), animate('400ms', style({ opacity: 1, transform: 'translateX(0px)' }))]),
])

export const DeleteAnimation = trigger('DeleteAnimation', [
    transition('*<=>*', [style({ opacity: 0, transform: 'translateX(100px)' }), animate('300ms', style({ opacity: 1, transform: 'translateX(140px)' }))]),
])

export const routingcenterAnimation = trigger('routingcenterAnimation', [
    transition('*<=>*', [style({ opacity: 0, transform: 'translateX(0px)' }), animate('300ms', style({ opacity: 1, transform: 'translateX(0px)' }))]),
])



