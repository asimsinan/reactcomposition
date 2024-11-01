function Yazi({yazilar,onRemovePost }) {
  function handleRemovePost(id) {
    onRemovePost(id);
  }
  return yazilar.map((yazi) => {
    return (
      <li key={yazi.id} style={{ marginBottom: "5px" }}>
        <span>{yazi.baslik + ", " + yazi.yazar + ", " + yazi.puan}&nbsp;</span>
        <span><button onClick={()=>handleRemovePost(yazi.id)}>Sil</button></span>
      </li>
    );
  });
}
export default Yazi;
