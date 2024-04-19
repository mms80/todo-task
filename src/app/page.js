import Todo from "@/components/todo";

export default function Home() {
  return (
      <>
          <main className="md:w-[500px] w-[90%] mx-auto mb-5">
              <h1 className="text-4xl text-blue-500 text-center md:my-10 my-7">Todo List</h1>
              <Todo/>
          </main>
      </>
  );
}
