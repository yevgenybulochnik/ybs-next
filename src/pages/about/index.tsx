import styles from './about.module.scss'


function About() {
  return (
  <div className={styles.about}>
    <h4>About Myself</h4>
    <p>
      Hello! and welcome to my website. My name is Eugene Bulochnik. I am an avid computer programmer and clinical pharmacist, currently living in the beautiful pacific northwest (Portland, OR). Originally I grew up in a town called Eden prairie, close to Minneapolis Minnesota.
    </p>
    <img className={styles.campfireImage} src="https://assets.yevgenybulochnik.com/campfire.jpeg" alt="" />
    <p>
      In 2012 I graduated from Drake University, with a Pharmacy Doctorate. I was accepted into the accelerated pharmacy program straight from highschool and completed my degree in 6 years. Currently, I hold my PharmD licence in the State of Oregon.
    </p>
    <p>
      As a kid I was always interested in computers. However, it wasn’t until college that I really had my first taste of coding. During an Internal Medicine rotation I developed a diabetes tracking application using visual basic and excel.
    </p>
    <p>
      Over the last 4 – 5 years I have started taking programming much more seriously. Whether its using ansible to provision servers or using typescript and react to develop an API/SPA, I am ecstatic. I find building something from scratch extremely gratifying and feel programming knowledge can be applied to almost any subject.
    </p>
    <p>
      More recently I completed my 340B ACE certification. The 340B pharmacy program is very interesting. It is really an intersection of law, pharmacy and data analytics.
    </p>
    <img className={styles.climbingImage} src="https://assets.yevgenybulochnik.com/climbing2.jpeg" alt="" />
    <p>
      When I am not coding, my favorite past times include rock climbing and playing the guitar! My favorite places are Smith Rock and Viento State park.
    </p>
    <h4>About This Site</h4>
    <p>
      After looking at quite a few static site generators, I landed on <a href="https://react-static.js.org">React-Static</a>. My preference was to stay within the react ecosystem along with having the ability to easily write content using markdown.
    </p>
    <p>
      The site itself is hosted off github pages with a custom domain registered through AWS Route53. Commits to the master branch will trigger a distribution rebuild using travis CI. The travis setup will then push all changes and deploy to pages using the gh-pages branch.
    </p>
    <p>
      Larger assets like images, are served using an S3 bucket and cloudfront all through a custom sub-domain setup.
    </p>
  </div>
  )
}

export default About
