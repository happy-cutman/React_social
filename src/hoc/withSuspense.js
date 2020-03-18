import React, {Suspense} from 'react';
import Preloader from '../components/common/Preloader/Preloader';

// делает оборачивание компонента в Suspense для React lazy

// const withSuspense = (Component) => {
//
//     return (props) => {
//         return <React.Suspense fallback={<Preloader/>}>
//             <Component {...props}/>
//         </React.Suspense>
//     }
// };
//
// export default withSuspense;

export default Component => (
    <Suspense fallback={<Preloader/>}>{Component}</Suspense>
);




