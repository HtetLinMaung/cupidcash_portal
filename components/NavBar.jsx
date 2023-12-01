"use client";
export default function NavBar() {
  return (
    <div
      className=" navbar "
      style={{ padding: "0px", backgroundColor: "#7468D4" }}
    >
      <div
        tabindex="0"
        role="button"
        class="btn btn-ghost w-16 btn-circle avatar flex-none"
      >
        <div class="w-10 rounded-full">
          <img src="/pos_logo.png" alt="Default Product Image" />
        </div>
      </div>
      <div class="flex-1">
        <input
          type="text"
          placeholder="Search"
          class="input input-bordered w-24 md:w-auto"
        />
      </div>

      <div class="dropdown dropdown-end flex-none">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle avatar flex-none"
        >
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
