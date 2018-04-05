const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  username: String,
  repoId: Number,
  repoName: String,
  profileImage: String,
  repoPage: String,
  createdAt: { type: Date, default: Date.now }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {

  return Repo.findOne({id: repo.id}).then((isRepoExist) => {
    if (!isRepoExist) {
      let newRepo = new Repo({
        username: repo.owner.login,
        repoId: repo.id,
        repoName: repo.name,
        profileImage: repo.owner.avatar_url,
        repoPage: repo.html_url
      });
      return newRepo.save()
    } else {
      isRepoExist.set(repo)
      return isRepoExist.save()
    }
  })
  .catch(error => {
    console.log('Mango Error: ', error);
    throw new Error (error)
  })

  // var parsedRepos = JSON.parse(github.body);
  // var repos = [];
 
  // for (let i = 0; i < parsedRepos.length; i++) {

  //   var repoObject = {
  //     username: parsedRepos[i].owner.login,
  //     repoId: parsedRepos[i].id,
  //     repoName: parsedRepos[i].name,
  //     profileImage: parsedRepos[i].owner.avatar_url,
  //     repoPage: parsedRepos[i].html_url,
  //     // createdAt: { type: Date, default: Date.now }
  //   }

  //   console.log('repoPage: ', repoObject.repoPage)
  //   // console.log('GOTHERERERER', Repo.repoObject.repoId)
  //   var repo = new Repo(repoObject);


  //     repo.save(error => {
  //       if (error) {console.log(error);}
  //       else {console.log('success', i);}
  //     });

  //     repos.push(repoObject);

  // } 
   //console.log("got here: ", repos)
}

let searchRepo = (callback) => { 
  Repo.find({}).sort({createdAt: -1}).limit(25).then((data)=>{
    callback(data)
  }).catch((e)=>{
    console.log(e)
  })
}


module.exports.save = save;
module.exports.searchRepo = searchRepo;
