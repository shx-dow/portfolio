"use client"

import { Github, Linkedin, Mail, Code, Award } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { CodeModal } from "@/components/code-modal"
import { GlowingSection} from "@/components/GlowingSection"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", code: "" })

  const openModal = (title: string, code: string) => {
    setModalContent({ title, code })
    setIsModalOpen(true)
  }

  return (
    <main className="container mx-auto px-4 py-16 space-y-16">
      {/* About Section */}
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-violet-800 animate-gradient" >
          Hi, I'm Chitransh
        </h1>
        <GlowingSection className="p-8">
          <section id="about">
            <div className="space-y-8">

            </div>

            <section id="about" className="space-y-4">
              <h2 className="text-2xl font-heading text-foreground">About Me</h2>
              <p className="text-lg text-foreground/80">
                Hey! I'm a 2nd-year B.Tech (CSE) student who's super into all the techy and cody things happening around the world. Whether it's AI, web dev, or just messing around with cool new tech, I love exploring and learning.
                When I'm not coding, you'll probably find me messing up with cricket or vibing to some music. Let's build something awesome!
              </p>
            </section>
          </section>
        </GlowingSection>

        {/* Skills Section */}
        <GlowingSection className="p-8">
          <section id="skills">
            <div className="space-y-4">
              <h2 className="text-2xl font-heading text-foreground">Skills & Interests</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "C++",
                  "Web Development",
                  "UI/UX Design",
                  "Problem Solving",
                ].map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-sm py-1.5 px-3 font-medium transition-all-300 hover:scale-105 
                      dark:bg-[#2B2B3B] dark:text-[#E8DAD6] dark:hover:bg-[#483D8B]
                      bg-[#EBE6FA] text-[#4B0082] hover:bg-[#D8BFD8] hover:text-[#483D8B]"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </section>
        </GlowingSection>

        {/* Projects Section */}
        <GlowingSection className="p-8">
          <section id="projects">
            <div className="space-y-4">
              <h2 className="text-2xl font-heading text-foreground">Projects</h2>
              <div className="grid gap-6">
                {/* Project cards with hover effects and gradients */}
                <Card className="transition-all-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-medium">Weather App</CardTitle>  
                    <CardDescription className="text-foreground/60">
                      A simple weather application using React and OpenWeatherMap API
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">
                      This project demonstrates API integration, state management, and responsive design in React.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="transition-all-300 hover:bg-primary/20 text-primary focus:outline-none focus:ring-10 active:outline-none border-none"
                      onClick={() => openModal("Weather App", "// Will update this soon")}
                    >
                      <Code className="mr-2 h-4 w-4" /> View Code
                    </Button>
                    
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        </GlowingSection>

        {/* Education Section */}
        <GlowingSection className="p-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-heading text-foreground">Education</h2>
            <Card className="transition-all-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="text-xl font-normal">B.Tech in Computer Science and Engineering</CardTitle>
                <CardDescription className="text-foreground/60">
                  IU Jaipur, 2023 - 2027 (Expected)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-foreground/80">
                  <li>Relevant coursework: Data Structures, Algorithms, Database Management, etc.</li>
                  <li>GPA: 9.75</li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </GlowingSection>

        {/* Achievements Section */}
        <GlowingSection className="p-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-heading text-foreground">Achievements</h2>
            <ul className="space-y-2">
              <li className="flex items-center transition-all-300 hover:translate-x-2">
                <Award className="mr-2 h-5 w-5 text-primary" />
                <span className="text-foreground/80">1st Place - Codera(Coding Competition)</span>
              </li>
              <li className="flex items-center transition-all-300 hover:translate-x-2">
                <Award className="mr-2 h-5 w-5 text-primary" />
                <span className="text-foreground/80">1st Place - Internal Hackathon 2024</span>
              </li>
            </ul>
          </section>
        </GlowingSection>

        {/* Connect Section */}
        <GlowingSection className="p-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-heading text-foreground">Let's Connect</h2>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/shx-dow"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <Github size={24} className="transition-all-300 hover:scale-110" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/chitransh-sharma-130313308/"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <Linkedin size={24} className="transition-all-300 hover:scale-110" />
              </Link>
              <Link
                href="mailto:chitransh.sharma1477@gmail.com"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <Mail size={24} className="transition-all-300 hover:scale-110" />
              </Link>
            </div>
          </section>
        </GlowingSection>

        <CodeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          code={modalContent.code}
          title={modalContent.title}
        />
    </main>
  )
}

