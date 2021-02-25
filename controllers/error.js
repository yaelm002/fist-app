exports.nonFound = (req,res,next)=>{

  res.status(404).render('not-found.ejs', {title : 'not-found', path: ''});
 
 };