import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  BriefcaseBusiness,
  MessageCircle,
  CalendarDays,
  Users,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <main className="bg-slate-50">

      <section className="relative overflow-hidden px-6 pb-24 pt-40">
        <div className="absolute left-1/2 top-10 z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl text-center">

          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm">
            <Sparkles size={15} />
            {isLoggedIn
              ? `Welcome back, ${user?.name?.split(" ")[0]}`
              : "One community. Every generation."}
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
            {isLoggedIn ? (
              <>
                Your community.
                <span className="text-indigo-600"> Your opportunities.</span>
                <span className="block">Your journey.</span>
              </>
            ) : (
              <>
                Where students,
                <span className="text-indigo-600"> alumni </span>
                and faculty
                <span className="block">grow together.</span>
              </>
            )}
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            {isLoggedIn
              ? "Stay connected with your college community, discover opportunities, find mentors and build meaningful professional connections."
              : "AlumniSphere brings your academic community together through mentorship, career opportunities, events and meaningful professional connections."}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  View My Profile
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="#features"
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600"
                >
                  Explore Platform
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  Join AlumniSphere
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="#features"
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600"
                >
                  Explore Platform
                </a>
              </>
            )}

          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center md:grid-cols-4">

          <div>
            <p className="text-3xl font-bold text-slate-900">500+</p>
            <p className="mt-1 text-sm text-slate-500">Students</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-slate-900">200+</p>
            <p className="mt-1 text-sm text-slate-500">Alumni</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-slate-900">50+</p>
            <p className="mt-1 text-sm text-slate-500">Mentors</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-slate-900">30+</p>
            <p className="mt-1 text-sm text-slate-500">Events</p>
          </div>

        </div>
      </section>

      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-600">
              The platform
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              More than an alumni directory.
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              A connected ecosystem where relationships turn into mentorship,
              opportunities and experiences.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            <Feature
              icon={<GraduationCap size={21} />}
              title="Mentorship"
              text="Find experienced alumni who can guide you through your career journey."
            />

            <Feature
              icon={<BriefcaseBusiness size={21} />}
              title="Jobs & Internships"
              text="Discover career opportunities shared directly by the alumni community."
            />

            <Feature
              icon={<CalendarDays size={21} />}
              title="Events"
              text="Discover workshops and events organized by your faculty and community."
            />

            <Feature
              icon={<Users size={21} />}
              title="Networking"
              text="Explore students, alumni and faculty and build meaningful connections."
            />

            <Feature
              icon={<MessageCircle size={21} />}
              title="Real-time Chat"
              text="Have direct conversations with people across the AlumniSphere community."
            />

            <Feature
              icon={<Sparkles size={21} />}
              title="Community"
              text="Keep your academic and professional network connected beyond graduation."
            />

          </div>
        </div>
      </section>

      {!isLoggedIn && (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-6xl rounded-3xl border border-indigo-100 bg-indigo-50 px-8 py-14 text-center md:px-16">

            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Your college community doesn't end at graduation.
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
              Stay connected. Give back. Find guidance. Discover opportunities.
            </p>

            <Link
              to="/signup"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Create your account
              <ArrowRight size={18} />
            </Link>

          </div>
        </section>
      )}

      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">

          <p className="font-bold text-slate-800">
            Alumni<span className="text-indigo-600">Sphere</span>
          </p>

          <p className="text-sm text-slate-400">
            Connecting communities beyond graduation.
          </p>

        </div>
      </footer>

    </main>
  );
};

const Feature = ({ icon, title, text }) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-100 hover:shadow-md">

      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="text-lg font-bold text-slate-800">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>
  );
};

export default Landing;