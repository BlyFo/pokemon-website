import "./Loading.css"

import { motion } from 'framer-motion';

function Loading() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { staggerChildren: 0.5 } }}
            exit={{ opacity: 1 }}
            className='loader'>
            <motion.div className='circle one' />
            <motion.div className='circle two' />
            <motion.div className='circle three' />
        </motion.div>
    );
}

export default Loading;