import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  GraduationCap,
  Users,
  Check,
  X,
  Send,
  Search,
  BriefcaseBusiness,
} from "lucide-react";

const Mentorship = () => {
  const { user, token } = useAuth();

  const [mentors, setMentors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      if (!user || !token) {
        if (!cancelled) {
          setLoading(false);
        }
        return;
      }

      try {
        if (user.role === "Student") {
          const response = await fetch(
            "http://localhost:5000/mentorship/mentors",
            {
              headers: {
                Authorization: token,
              },
            }
          );

          const data = await response.json();

          if (!cancelled && response.ok) {
            setMentors(data.mentors || []);
          }
        }

        if (user.role === "Alumni") {
          const response = await fetch(
            "http://localhost:5000/mentorship/requests",
            {
              headers: {
                Authorization: token,
              },
            }
          );

          const data = await response.json();

          if (!cancelled && response.ok) {
            setRequests(data.requests || []);
          }
        }
      } catch (error) {
        console.error("Mentorship error:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [user, token]);

  const sendRequest = async (mentorId) => {
    try {
      const response = await fetch(
        "http://localhost:5000/mentorship/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            mentorId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMentors((prev) =>
          prev.map((mentor) =>
            mentor._id === mentorId
              ? { ...mentor, requestSent: true }
              : mentor
          )
        );
      } else {
        alert(data.message || "Unable to send request");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  const updateRequest = async (requestId, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/mentorship/request/${requestId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRequests((prev) =>
          prev.map((request) =>
            request._id === requestId
              ? { ...request, status }
              : request
          )
        );
      } else {
        alert(data.message || "Unable to update request");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  if (!user || !token) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 pt-32">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <GraduationCap
            size={42}
            className="mx-auto text-indigo-600"
          />

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Mentorship
          </h1>

          <p className="mt-3 text-slate-500">
            Please login to access mentorship features.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="h-10 w-64 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-3xl bg-white shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (user.role === "Student") {
    const filteredMentors = mentors.filter((mentor) => {
      const name = mentor.name?.toLowerCase() || "";
      const company = mentor.currentCompany?.toLowerCase() || "";
      const job = mentor.jobTitle?.toLowerCase() || "";

      return (
        name.includes(search.toLowerCase()) ||
        company.includes(search.toLowerCase()) ||
        job.includes(search.toLowerCase())
      );
    });

    return (
      <main className="min-h-screen bg-slate-50 px-6 pb-20 pt-32">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <GraduationCap size={24} />
              </div>

              <div>
                <p className="text-sm font-semibold text-indigo-600">
                  Student
                </p>

                <h1 className="text-3xl font-bold text-slate-900">
                  Find a Mentor
                </h1>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-slate-500">
              Connect with experienced alumni who can guide you through
              your academic and professional journey.
            </p>
          </div>

          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <Search size={19} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search mentors by name, company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {filteredMentors.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
              <Users
                size={40}
                className="mx-auto text-slate-300"
              />

              <h2 className="mt-4 text-xl font-bold text-slate-800">
                No mentors found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try searching with a different name, company or role.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredMentors.map((mentor) => (
                <div
                  key={mentor._id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-lg font-bold text-indigo-600">
                      {mentor.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900">
                        {mentor.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {mentor.jobTitle || "Alumni"}
                      </p>

                      {mentor.currentCompany && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                          <BriefcaseBusiness size={13} />
                          {mentor.currentCompany}
                        </p>
                      )}
                    </div>
                  </div>

                  {mentor.bio && (
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-500">
                      {mentor.bio}
                    </p>
                  )}

                  {mentor.skills?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {mentor.skills.slice(0, 5).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => sendRequest(mentor._id)}
                    disabled={mentor.requestSent}
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      mentor.requestSent
                        ? "cursor-not-allowed bg-slate-100 text-slate-400"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {mentor.requestSent ? (
                      <>
                        <Check size={17} />
                        Request Sent
                      </>
                    ) : (
                      <>
                        <Send size={17} />
                        Request Mentorship
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  if (user.role === "Alumni") {
    return (
      <main className="min-h-screen bg-slate-50 px-6 pb-20 pt-32">
        <div className="mx-auto max-w-6xl">

          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <Users size={24} />
              </div>

              <div>
                <p className="text-sm font-semibold text-indigo-600">
                  Alumni Mentor
                </p>

                <h1 className="text-3xl font-bold text-slate-900">
                  Mentorship Requests
                </h1>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-slate-500">
              Students interested in receiving mentorship from you will
              appear here.
            </p>
          </div>

          {requests.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
              <GraduationCap
                size={40}
                className="mx-auto text-slate-300"
              />

              <h2 className="mt-4 text-xl font-bold text-slate-800">
                No mentorship requests
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                You don't have any pending mentorship requests yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request._id}
                  className="flex flex-col justify-between gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 font-bold text-indigo-600">
                      {request.student?.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900">
                        {request.student?.name}
                      </h2>

                      <p className="text-sm text-slate-500">
                        {request.student?.department}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {request.student?.graduationYear}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {request.status === "Pending" ? (
                      <>
                        <button
                          onClick={() =>
                            updateRequest(request._id, "Accepted")
                          }
                          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                          <Check size={17} />
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            updateRequest(request._id, "Rejected")
                          }
                          className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          <X size={17} />
                          Decline
                        </button>
                      </>
                    ) : (
                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                          request.status === "Accepted"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {request.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-20 pt-32">
      <div className="mx-auto max-w-6xl">

        <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
          <GraduationCap
            size={44}
            className="mx-auto text-indigo-600"
          />

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Mentorship Management
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Faculty can monitor and coordinate mentorship activities
            across the AlumniSphere community.
          </p>
        </div>

      </div>
    </main>
  );
};

export default Mentorship;