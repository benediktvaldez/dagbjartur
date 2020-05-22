import Header from '$components/Header';
import Meta from '$components/Meta';
import { motion } from 'framer-motion';

export default function Layout(props: any) {
  return (
    <motion.section
      initial={{ backgroundColor: '#fff', color: '#000' }}
      animate={{ backgroundColor: props.bgColor || '#fff', color: props.bgColor ? '#fff' : '#000' }}
      exit={{ backgroundColor: '#fff', color: '#000' }}
    >
      <section
        className={`layout ${props.pathname == 'info' && 'info_page'}`}
        // style={{
        //   backgroundColor: `${props.bgColor || '#fff'}`,
        //   color: `${props.pathname == 'info' && 'white'}`,
        // }}
      >
        <Meta siteTitle={props.siteTitle} siteDescription={props.siteDescription} />
        <Header siteTitle={props.siteTitle} />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="content">{props.children}</div>
        </motion.div>
        <style jsx>
          {`
            .layout {
              overflow-x: hidden;
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
            .layout .info_page {
              color: #ebebeb;
            }
            .content {
              flex-grow: 1;
            }
            @media (min-width: 768px) {
              .layout {
                display: block;
              }
              .content {
                flex-grow: none;
                width: 70vw;
                margin-left: 30vw;
              }
            }
          `}
        </style>
      </section>
    </motion.section>
  );
}
