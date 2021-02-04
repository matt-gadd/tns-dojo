import { create, tsx } from "@dojo/framework/core/vdom";
import icache from "@dojo/framework/core/middleware/icache";

const factory = create({ icache });

const Thing = factory(({ middleware: { icache } }) => {
  const count = icache.getOrSet("count", 0);
  return (
    <native-stack>
      <native-button
        text={`hello ${count}`}
        ontap={() => {
          icache.set("count", (count) => count + 1);
          alert("Button Hello Tapped!");
        }}
      ></native-button>
      Hello
      <native-label text="foo"></native-label>
    </native-stack>
  );
});

export default Thing;
