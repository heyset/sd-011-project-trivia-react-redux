import md5 from 'crypto-js/md5';

function getGravatarUrl(gravatarEmail) {
  return `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
}

export default getGravatarUrl;
