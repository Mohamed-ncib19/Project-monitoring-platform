import { color } from 'framer-motion';
import './avatar.styles.css';
const Avatar = ({name,background,rounded,textColor}) => {
    const initials = name ? (
        name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
    ) : '';
    return ( 
            <span className={` ${'bg-'+background} avatar ${'rounded-'+rounded} p-3 text-${textColor} fw-bold  `} >{initials}</span>
     );
}
 
export default Avatar;