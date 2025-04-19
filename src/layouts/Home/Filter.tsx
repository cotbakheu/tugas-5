import { useEffect, useMemo, useState } from "react";
import { InputSelect, Option } from "../../components/Input";
import { useSearchParams } from "react-router";
import classNames from "classnames";
import { useAppContext } from "../../context/AppContext";
import { PageViewType } from "../../type/global";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state, dispatch } = useAppContext();
  const { pageView } = state.config;

  const [sortOption] = useState<Option[]>([
    {
      label: "Name ASC",
      value: "name asc",
    },
    {
      label: "Name DESC",
      value: "name desc",
    },
  ]);

  const sort = searchParams.get("sort");
  const order = searchParams.get("order");

  useEffect(() => {
    if (searchParams.size === 0) {
      setSearchParams({
        order: "asc",
        sort: "name",
        page: "1",
        search: "",
      });
    }
  }, [searchParams.size, setSearchParams]);

  const handleChangeSelectSort = (value: string) => {
    const parsedValue = value.split(" ");
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sort: parsedValue[0],
      order: parsedValue[1],
      page: "1",
    });
  };

  const sortByValue = useMemo(() => {
    if (!sort || !order) {
      return "";
    }
    return `${sort} ${order}`;
  }, [sort, order]);

  const handleChangeType = (type: PageViewType) => {
    localStorage.setItem("pageView", type);
    dispatch({
      type: "SET_PAGE_VIEW",
      payload: {
        pageView: type,
      },
    });
  };

  return (
    <section className="flex">
      <div className="flex gap-2 justify-between sm:justify-end w-full">
        <div className="w-full sm:w-1/2 md:w-[300px]">
          <InputSelect
            options={sortOption}
            id="sort"
            value={sortByValue}
            innerLabel="Sort By"
            onChange={handleChangeSelectSort}
          />
        </div>
        <div className="flex overflow-hidden rounded-lg md:hidden">
          <div
            onClick={() => handleChangeType("single")}
            className={classNames(
              "bg-dark p-2 flex justify-center items-center w-14",
              pageView === "single" ? "bg-dark" : "bg-secondary-background"
            )}
          >
            <img src="/icons/block.svg" alt="block" />
          </div>
          <div
            onClick={() => handleChangeType("multiple")}
            className={classNames(
              "border-l border-light-grey rounded-r-lg flex justify-center items-center p-2 w-14",
              pageView === "multiple" ? "bg-dark" : "bg-secondary-background"
            )}
          >
            <img src="/icons/four-block.svg" alt="block" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Filter;
