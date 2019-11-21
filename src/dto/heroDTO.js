export default hero => ({
    id: hero.id,
    name: hero.name,
    description: hero.description,
    imageURI: `${hero.thumbnail.path}/standard_fantastic.${hero.thumbnail.extension}`,
});
