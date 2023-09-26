import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai'
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../Wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

function Work() {

  const [activeFilter, setactiveFilter] = useState('All')
  const [animateCard, setanimateCard] = useState([{ y: 0, opacity: 1 }])
  const [works, setworks] = useState([])
  const [filterwork, setfilterwork] = useState([])


  const handleWorkFilter = (item) => {
    setactiveFilter(item)
    setanimateCard([{ y: 100, opacity: 0 }])

    setTimeout(() => {
      setanimateCard([{ y: 0, opacity: 1 }])

      if (item === 'All') {
        setfilterwork(works)
      } else {
        setfilterwork(works.filter((work) => work.tags.includes(item)))
      }
    }, 500);
  }

  useEffect(() => {
    const query = "*[_type == 'works']"
    client.fetch(query)
      .then((data) => {
        setworks(data);
        setfilterwork(data)
      })

  }, [])

  return (
    <>
      <h2 className="head-text"> My Creative <span>Portfolio</span> Section </h2>
      <div className="app__work-filter">
        {['UI/UX', 'web App', 'Mobile App', 'React Js', 'All'].map((item, index) => (
          <div
            key={item + index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__work-portfolio'
      >
        {filterwork.map((work, index) => (
          <div className="app__work-item app__flex" key={work + index}>
            <div className="app__work-img app__flex">
              <img src={urlFor(work.imgUrl)} alt={work.name} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, staggerChildren: 0.5, ease: 'easeIn' }}
                className='app__work-hover app__flex'
              >
                <a href={work.projectLink} target="_blank" rel='noreferrer'>
                  <motion.div
                    whileHover={{ scale: [1, 0.9] }}
                    whileInView={{ scale: [0, 1] }}
                    transition={{ duration: 0.25 }}
                    className='app__flex'
                  >
                    <AiFillEye />

                  </motion.div>
                </a>
                <a href={work.codeLink} target="_blank" rel='noreferrer'>
                  <motion.div
                    whileHover={{ scale: [1, 0.9] }}
                    whileInView={{ scale: [0, 1] }}
                    transition={{ duration: 0.25 }}
                    className='app__flex'
                  >
                    <AiFillGithub />

                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Work, 'app__work'),
  "work",
  "app__primarybg"
)  