import {
    trigger,
    transition,
    style,
    query,
    group,
    animate
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
    transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: 0
            })
        ], { optional: true }),
        query(':enter', [
            style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' })
        ], { optional: true }),
        group([
            query(':leave', [
                animate('300ms ease-out', style({ 
                    opacity: 0, 
                    transform: 'scale(1.05) translateY(-10px)' 
                }))
            ], { optional: true }),
            query(':enter', [
                animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ 
                    opacity: 1, 
                    transform: 'scale(1) translateY(0)' 
                }))
            ], { optional: true })
        ])
    ])
]);
