import DefaultHeader from "@components/Header";
import countyList from "@constants/county";
import Context from "@context/BusRoute/context";
import useRoute from "@services/hooks/useRoute";
import { AutoComplete, Select, Switch } from "antd";
import { useContext } from "react";

const { Option } = Select;

const Header = () => {
  const { county, setCounty, searchText, setSearchText, direction, setDirection } = useContext(Context);

  const { data: route } = useRoute({ county });

  return (
    <DefaultHeader>
      <Select
        showSearch
        style={{ width: 125 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        defaultValue="Taipei"
        onChange={(value: string) => {
          setCounty(value);
          setSearchText("");
        }}
      >
        {countyList?.map(({ CountyName, County }) => (
          <Option value={County}>{CountyName}</Option>
        ))}
      </Select>
      <AutoComplete
        style={{ width: 125 }}
        options={route?.map(({ RouteName }: any) => ({
          value: RouteName.Zh_tw,
        }))}
        filterOption={(inputValue, option) => option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        value={searchText}
        placeholder="請輸入公車路線"
        onChange={(value) => setSearchText(value)}
      />
      <Switch
        style={{ marginLeft: "10px" }}
        size="default"
        checkedChildren="去程"
        unCheckedChildren="返程"
        defaultChecked
        onChange={(e) => setDirection(Number(!e))}
      />
    </DefaultHeader>
  );
};

export default Header;
