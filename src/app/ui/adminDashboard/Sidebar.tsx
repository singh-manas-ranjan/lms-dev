"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Menu, X } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { instructorEndpoints, studentEndpoints, TEndpoint } from "./Navbar";

const Sidebar = ({ userId }: { userId: string }) => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const handleToggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
  };
  const pathname = usePathname();
  const role = pathname.includes("admin/students") ? "students" : "instructors";
  const endpoints: TEndpoint[] =
    role === "students" ? studentEndpoints : instructorEndpoints;

  const sidebarWidth = useBreakpointValue({
    base: "80px",
    md: isSidebarExpanded ? "200px" : "80px",
  });

  const open = {
    width: "100%",
    opacity: "1",
    display: "flex",
    transition: "all 1s ease-in-out",
  };
  const close = {
    display: "none",
    width: "0",
    opacity: "0",
    overflow: "hidden",
  };

  return (
    <Box
      zIndex={99}
      as="nav"
      w={sidebarWidth}
      color="#044F63"
      transition="width 0.2s ease"
      pos="fixed"
      h="full"
      overflowY="auto"
      bg="#fff"
      borderRight="1px"
      borderColor="gray.200"
      display={{ base: "none", sm: "flex" }}
    >
      <Flex direction="column" p="4" mt={20} w={"100%"}>
        <IconButton
          aria-label="Toggle Menu"
          icon={
            isSidebarExpanded ? (
              <X size={18} color={isSidebarExpanded ? "#2D89BA" : "#044F63"} />
            ) : (
              <Menu size={18} />
            )
          }
          onClick={handleToggleSidebar}
          mb="4"
          colorScheme="gray"
          size={"sm"}
          width={"50px"}
          _hover={{ color: "#2D89BA" }}
        />
        <Flex direction="column" rowGap="5" mt={5}>
          {endpoints.map((link, idx) => {
            const IconComponent = link.icon;
            return (
              <NextLink
                key={idx}
                href={`/admin/${role}/${userId}${link.href}`}
                onClick={() => {
                  setSidebarExpanded(false);
                  setActiveLink(link.href);
                }}
              >
                <Box
                  p={2}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  columnGap={4}
                  _hover={{ textDecoration: "none", bg: "gray.100" }}
                  bg={activeLink === link.href ? "#2D89BA20" : "#fff"}
                  borderRadius={4}
                >
                  <Box
                    as={IconComponent}
                    color={activeLink === link.href ? "#2D89BA" : "#044F63"}
                    size={20}
                  />
                  {
                    <Text
                      sx={isSidebarExpanded ? open : close}
                      color={activeLink === link.href ? "#2D89BA" : "#044F63"}
                    >
                      {link.name}
                    </Text>
                  }
                </Box>
              </NextLink>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
