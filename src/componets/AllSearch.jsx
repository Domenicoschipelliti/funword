import SearchBar from "./SearchBar";
import SearchBarManga from "./SearchBarManga";

const AllSearch = () => {
  return (
    <div>
      <h3 className="text-light">Ricerca per anime e manga:</h3>
      <div>
        <SearchBar />
      </div>
      <div>
        <SearchBarManga />
      </div>
    </div>
  );
};
export default AllSearch;
