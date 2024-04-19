import Todo from "@/components/todo";

export default function Home() {
  return (
      <>
          <main className="w-[500px] mx-auto">
              <h1 className="text-4xl text-blue-500 text-center my-10">Todo List</h1>
              <Todo/>
          </main>
      </>
  );
}
