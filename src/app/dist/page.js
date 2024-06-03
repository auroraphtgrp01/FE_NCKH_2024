'use strict';
exports.__esModule = true;
var card_1 = require('@/components/ui/card');
function Home() {
   return React.createElement(
      'main',
      { className: 'flex flex-col justify-between mt-10' },
      React.createElement(
         'div',
         null,
         React.createElement(
            card_1.Card,
            null,
            React.createElement(
               card_1.CardHeader,
               null,
               React.createElement(card_1.CardTitle, null, 'Card Title'),
               React.createElement(
                  card_1.CardDescription,
                  null,
                  'Card Description'
               )
            ),
            React.createElement(
               card_1.CardContent,
               null,
               React.createElement('p', null, 'Card Content')
            ),
            React.createElement(
               card_1.CardFooter,
               null,
               React.createElement('p', null, 'Card Footer')
            )
         )
      )
   );
}
exports['default'] = Home;
